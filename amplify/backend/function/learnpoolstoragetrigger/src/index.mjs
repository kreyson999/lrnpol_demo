/* Amplify Params - DO NOT EDIT
	API_LEARNPOOL_COURSESECTIONSTEPVIDEOTABLE_ARN
	API_LEARNPOOL_COURSESECTIONSTEPVIDEOTABLE_NAME
	API_LEARNPOOL_GRAPHQLAPIENDPOINTOUTPUT
	API_LEARNPOOL_GRAPHQLAPIIDOUTPUT
	API_LEARNPOOL_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import {
  DynamoDBClient,
  PutItemCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import crypto from 'crypto';

import {
  MediaConvertClient,
  CreateJobCommand,
} from '@aws-sdk/client-mediaconvert';

import { readFile } from 'fs/promises';
const MediaConvertJob = JSON.parse(await readFile('./job.json'));

const COURSE_SECTION_STEP_VIDEO_TABLE_NAME =
  process.env.API_LEARNPOOL_COURSESECTIONSTEPVIDEOTABLE_NAME;

const COURSE_SECTION_STEP_TABLE_NAME =
  process.env.API_LEARNPOOL_COURSESECTIONSTEPTABLE_NAME;

const MEDIACONVERT_DESTINATION_BUCKET =
  process.env.MEDIACONVERT_DESTINATION_BUCKET;

export const handler = async (event) => {
  const hasUploadedVideo = (key) => {
    const splittedKey = key.split('/');
    // key should have 7 elements after splitting
    return splittedKey[2] === 'courses' && splittedKey.length === 7;
  };

  const uploadedObject = event['Records'][0]['s3']['object'];
  const uploadedObjectKey = uploadedObject['key'];

  if (!uploadedObject || !hasUploadedVideo(uploadedObjectKey)) {
    return {
      statusCode: 404,
      body: JSON.stringify(
        'Uploaded file is not a video file! Can not convert.'
      ),
    };
  }

  const REGION = 'eu-central-1';

  const destinationFolder = `${
    process.env.ENV === 'dev' ? 'dev/' : ''
  }${uploadedObjectKey.split('/').slice(2, -1).join('/')}`;

  const sourceS3Bucket = event['Records'][0]['s3']['bucket']['name'];

  const clientMediaConvert = new MediaConvertClient({ region: REGION });
  const clientDynamoDB = new DynamoDBClient({ region: REGION });

  try {
    let mediaConvertJob = { ...MediaConvertJob };

    mediaConvertJob['Settings']['OutputGroups'][0]['OutputGroupSettings'][
      'HlsGroupSettings'
    ][
      'Destination'
    ] = `${MEDIACONVERT_DESTINATION_BUCKET}${destinationFolder}/HLS/output`;
    mediaConvertJob['Settings']['Inputs'][0][
      'FileInput'
    ] = `s3://${sourceS3Bucket}/${uploadedObjectKey.replace('%3A', ':')}`;

    const STEP_VIDEO_ID = crypto.randomUUID();
    const STEP_ID = uploadedObjectKey.split('/').at(-2);

    const command = new CreateJobCommand({
      ...mediaConvertJob,
      UserMetadata: {
        app: 'LEARNPOOL',
        env: process.env.ENV,
        stepVideoId: STEP_VIDEO_ID,
      },
    });

    await clientMediaConvert.send(command);

    const createCourseSectionVideoStepCommand = new PutItemCommand({
      TableName: COURSE_SECTION_STEP_VIDEO_TABLE_NAME,
      Item: {
        id: {
          S: STEP_VIDEO_ID,
        },
        __typename: {
          S: 'CourseSectionStepVideo',
        },
        status: {
          S: 'PROCCESSING',
        },
        url: {
          NULL: true,
        },
        duration: {
          N: '0',
        },
        courseSectionStepVideoCourseSectionStepId: {
          S: STEP_ID,
        },
      },
    });

    const updateCourseSectionStepCommand = new UpdateItemCommand({
      TableName: COURSE_SECTION_STEP_TABLE_NAME,
      Key: {
        id: {
          S: STEP_ID,
        },
      },
      UpdateExpression: 'set #stepVideoKey = :stepVideo',
      ExpressionAttributeValues: {
        ':stepVideo': {
          S: STEP_VIDEO_ID,
        },
      },
      ExpressionAttributeNames: {
        '#stepVideoKey': 'courseSectionStepCourseSectionStepVideoId',
      },
    });

    await clientDynamoDB.send(createCourseSectionVideoStepCommand);
    await clientDynamoDB.send(updateCourseSectionStepCommand);
  } catch (error) {
    console.error(error);
  }

  return {
    statusCode: 200,
    body: JSON.stringify('Successfully converted video'),
  };
};
