/* Amplify Params - DO NOT EDIT
	API_LEARNPOOL_GRAPHQLAPIENDPOINTOUTPUT
	API_LEARNPOOL_GRAPHQLAPIIDOUTPUT
	API_LEARNPOOL_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

import { DynamoDBClient, UpdateItemCommand } from '@aws-sdk/client-dynamodb';

const CDN_HOSTNAME = process.env.CDN_HOSTNAME;
const COURSE_SECTION_STEP_VIDEO_TABLE_NAME =
  process.env.API_LEARNPOOL_COURSESECTIONSTEPVIDEOTABLE_NAME;

export const handler = async (event) => {
  const REGION = 'eu-central-1';
  const APP = 'LEARNPOOL';
  if (event.detail.userMetadata.app !== APP) {
    return {
      statusCode: 200,
      body: JSON.stringify(
        'Invalid APP: This function works only for LEARNPOOL APP'
      ),
    };
  }
  if (event.detail.status === 'COMPLETE') {
    try {
      const clientDynamoDB = new DynamoDBClient({ region: REGION });

      const HLSOutputGroupDetails = event.detail.outputGroupDetails[0];

      const resolutions = HLSOutputGroupDetails.outputDetails.map(
        (output) => `RES_${output.videoDetails.heightInPx}p`
      );
      const videoKey = HLSOutputGroupDetails['playlistFilePaths'][0]
        .replace('s3://', '')
        .split('/')
        .slice(1)
        .join('/');
      const duration = HLSOutputGroupDetails.outputDetails[0].durationInMs;

      const createCourseSectionVideoStepCommand = new UpdateItemCommand({
        TableName: COURSE_SECTION_STEP_VIDEO_TABLE_NAME,
        Key: {
          id: {
            S: event.detail.userMetadata.stepVideoId,
          },
        },
        UpdateExpression:
          'set #status = :status, #url = :url, #duration = :duration',
        ExpressionAttributeValues: {
          ':status': {
            S: 'UPLOADED',
          },
          ':url': {
            M: {
              resolution: {
                SS: resolutions,
              },
              url: {
                S: `${CDN_HOSTNAME}${videoKey}`,
              },
            },
          },
          ':duration': {
            N: String(duration),
          },
        },
        ExpressionAttributeNames: {
          '#status': 'status',
          '#url': 'url',
          '#duration': 'duration',
        },
      });

      await clientDynamoDB.send(createCourseSectionVideoStepCommand);
    } catch (error) {
      return {
        statusCode: 404,
        body: JSON.stringify(`Message: ${error}`),
      };
    }
  }
  return {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
};
