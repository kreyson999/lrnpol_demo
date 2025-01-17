import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import config from '@/amplifyconfiguration.json';

import {
  getLandingPagePublicCourseWithSteps,
  listCoursesSlugs,
} from '@/services/graphql/course/queries';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

import ErrorContainer from '@/components/shared/ErrorContainer';
import CreateAccountLeadButton from './CreateAccountLeadButton';
import TawkToIntegration from './TawkToIntegration';
import ContentSection from './ContentSection';
import ContentSectionStep from './ContentSectionStep';
import RecommendedCoursesSection from './RecommendedCoursesSection';
import { convertJSONToRichTextHTML } from '@/helpers/convertJSONToRichTextHTML';

import '@/styles/richTextStyles.css';
import FacebookPixel from '../FacebookPixel';
import FixedCourseCard from './FixedCourseCard';
import { signAmplifyServerImage } from '@/helpers/signAmplifyServerImage';

import DevicesIcon from '@mui/icons-material/Devices';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import QuizIcon from '@mui/icons-material/Quiz';
import React from 'react';
import { calculateCourseStats, getCourseFeatures } from './helpers';
import { isNonNull } from '@/helpers/isNonNull';
import axios from 'axios';
import { CourseStatus, ListCoursesSlugsQuery } from '@/services/API';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 86400;

const FEATURES = [
  {
    id: 0,
    icon: <DevicesIcon />,
    text: 'Możliwość nauki na wielu urządzeniach',
  },
  {
    id: 1,
    icon: <LiveTvIcon />,
    text: 'Wysoka jakość i dostęp na zawsze',
  },
  {
    id: 2,
    icon: <QuizIcon />,
    text: 'Intuicyjna platforma kursowa',
  },
] as const;

export async function generateStaticParams() {
  const result = await axios.post<{ data: ListCoursesSlugsQuery }>(
    config.aws_appsync_graphqlEndpoint,
    {
      query: listCoursesSlugs,
    },
    {
      headers: {
        ['x-api-key']: config.aws_appsync_apiKey,
      },
    }
  );

  return result.data?.data?.listCourses?.items ?? [];
}

export default async function Home({ params: { slug } }: Props) {
  const BASE_URL = `https://${slug}.${process.env.NEXT_PUBLIC_BASE_URL}`;

  const amplifyServerClient = generateServerClientUsingCookies({
    config,
    cookies,
    authMode: 'apiKey',
  });

  const { data, errors } = await amplifyServerClient.graphql({
    query: getLandingPagePublicCourseWithSteps,
    variables: {
      slug,
    },
  });

  if (!data.getCourse) {
    return (
      <ErrorContainer>
        Kurs, na który próbujesz wejść nie istnieje!
      </ErrorContainer>
    );
  }

  if (errors) {
    return (
      <ErrorContainer>
        Wystąpił błąd podczas pobierania kursu z bazy danych:{' '}
        {JSON.stringify(errors)}
      </ErrorContainer>
    );
  }

  const { courseLandingPage, courseSections, title, status } = data.getCourse;

  if (status !== CourseStatus.PUBLISHED) {
    return (
      <ErrorContainer>
        Kurs, na który próbujesz wejść nie został jeszcze zweryfikowany i
        opublikowany!
      </ErrorContainer>
    );
  }

  const sections =
    courseSections?.items.filter(isNonNull).map((section) => {
      return {
        courseSectionSteps:
          section.courseSectionSteps?.items.filter(isNonNull).map((step) => {
            return {
              id: step.id,
              title: step.title,
              type: step.type,
              courseSectionStepVideo: step.courseSectionStepVideo
                ? {
                    id: step.courseSectionStepVideo.id,
                    duration: step.courseSectionStepVideo.duration,
                  }
                : undefined,
              courseSectionStepTest: step.courseSectionStepTest
                ? {
                    questions:
                      step.courseSectionStepTest.questions?.items.filter(
                        isNonNull
                      ).length ?? 0,
                  }
                : undefined,
            };
          }) ?? [],
      };
    }) ?? [];

  const courseStats = calculateCourseStats(sections);
  const courseFeatures = getCourseFeatures(courseStats);

  return (
    <>
      {data.getCourse.facebookPixelId && (
        <FacebookPixel id={data.getCourse.facebookPixelId} />
      )}
      {courseLandingPage?.tawkPropertyId && courseLandingPage?.tawkWidgetId && (
        <TawkToIntegration
          propertyId={courseLandingPage.tawkPropertyId}
          widgetId={courseLandingPage.tawkWidgetId}
        />
      )}

      <Box
        sx={{
          backgroundColor: courseLandingPage?.fixedCard.backgroundColor,
        }}
        className="lg:tw-hidden tw-border-t tw-fixed tw-left-0 tw-right-0 tw-bottom-0 tw-max-h-16 tw-z-50 tw-flex tw-justify-between tw-gap-4"
      >
        <Box className="tw-flex">
          {courseLandingPage?.fixedCard.imageKey && (
            <Image
              src={await signAmplifyServerImage(
                courseLandingPage?.fixedCard.imageKey
              )}
              width={114}
              height={64}
              className="tw-aspect-video tw-max-h-16"
              alt={`Zdjęcie kursu: ${data.getCourse.title}`}
              style={{ objectFit: 'cover' }}
            />
          )}
          <Box className="tw-hidden sm:tw-flex tw-self-center tw-flex-col tw-ml-4">
            <Typography
              sx={{
                color: courseLandingPage?.fixedCard.titleTextColor,
              }}
              className="tw-text-xl tw-font-semibold"
            >
              {title}
            </Typography>
          </Box>
        </Box>
        <Box className="tw-flex tw-gap-4 tw-items-center tw-py-2 tw-pr-4">
          <Box className="tw-flex tw-flex-col tw-items-end">
            <Typography
              sx={{
                color: courseLandingPage?.fixedCard.priceTextColor,
              }}
              className="tw-text-xl tw-leading-none tw-font-extrabold tw-whitespace-nowrap"
            >
              {data.getCourse?.price} zł
            </Typography>
            <Typography
              sx={{
                color: courseLandingPage?.fixedCard.discountPriceTextColor,
              }}
              className="tw-text-sm tw-line-through tw-whitespace-nowrap"
            >
              {data.getCourse?.discountPrice} zł
            </Typography>
          </Box>
          <Box>
            <Link href={`${BASE_URL}/stworzkonto`}>
              <CreateAccountLeadButton
                color={courseLandingPage!.fixedCard.buttonTextColor}
                backgroundColor={
                  courseLandingPage!.fixedCard.buttonBackgroundColor
                }
                className="tw-rounded-full tw-flex  tw-flex-col tw-justify-center tw-whitespace-nowrap tw-px-4 tw-py-2 tw-normal-case tw-text-base"
              >
                Kup dostęp
              </CreateAccountLeadButton>
            </Link>
          </Box>
        </Box>
      </Box>

      <AppBar
        sx={{
          backgroundColor: courseLandingPage!.appBar.backgroundColor,
        }}
        position="static"
        elevation={0}
      >
        <Container
          maxWidth="xl"
          className="lg:tw-grid lg:tw-grid-cols-12 tw-gap-8"
        >
          <Toolbar className="lg:tw-col-span-12 xl:tw-col-span-11 xl:tw-col-start-2 tw-flex tw-justify-between tw-items-center tw-px-0">
            <Box className="tw-relative     ">
              {courseLandingPage?.appBar.logoKey && (
                <Image
                  src={await signAmplifyServerImage(
                    courseLandingPage?.appBar.logoKey
                  )}
                  alt={`Logo kursu: ${data.getCourse.title}`}
                  width={200}
                  height={80}
                />
              )}
            </Box>

            <Link href={`${BASE_URL}/app`}>
              <Button
                className={`tw-bg-transparent tw-rounded-full tw-normal-case tw-text-base`}
                sx={{
                  color: courseLandingPage?.appBar.watchCourseTextColor,
                }}
              >
                Zaloguj się
              </Button>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        sx={{
          backgroundColor: courseLandingPage?.header.backgroundColor,
        }}
        component={'header'}
      >
        <Container
          maxWidth="xl"
          className="tw-grid lg:tw-grid-cols-12 tw-py-12 lg:tw-py-16 tw-gap-8"
        >
          <Box className="tw-flex tw-flex-col xl:tw-col-start-2 lg:tw-col-span-8 xl:tw-col-span-8">
            <Typography
              variant="h1"
              sx={{
                color: courseLandingPage?.header.titleColor,
              }}
              className="lg:-tw-ml-1 tw-text-5xl sm:tw-text-6xl lg:tw-text-7xl xl:tw-text-8xl lg:tw-text-left tw-font-bold tw-leading-snug tw-text-center"
            >
              {courseLandingPage?.header.title}
            </Typography>
            <Typography
              sx={{
                color: courseLandingPage?.header.subtitleColor,
              }}
              variant="subtitle1"
              className="tw-mt-4 lg:tw-mt-8 tw-text-xl sm:tw-text-2xl lg:tw-text-3xl  lg:tw-text-left  tw-text-secondary-main tw-text-center"
            >
              {courseLandingPage?.header.subtitle}
            </Typography>
            <Box className="tw-mt-8 lg:tw-mt-16 tw-grid tw-grid-cols-3 lg:tw-flex lg:tw-gap-16 tw-gap-4 tw-text-center">
              {courseFeatures.map(({ subtitle, value }) => (
                <Box
                  key={subtitle}
                  className="tw-flex tw-flex-col tw-items-center "
                >
                  <Typography
                    variant="h3"
                    component="p"
                    sx={{
                      color: courseLandingPage?.header.statsValueTextColor,
                    }}
                    className="tw-text-3xl lg:tw-text-4xl tw-font-bold"
                  >
                    {value}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: courseLandingPage?.header.statsTitleTextColor,
                    }}
                    className="tw-text-lg lg:tw-text-xl"
                  >
                    {subtitle}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box className="tw-mt-8 tw-flex tw-flex-col tw-items-center lg:tw-hidden">
              <Link href={`${BASE_URL}/stworzkonto`}>
                <CreateAccountLeadButton
                  color={courseLandingPage!.header.callToActionTextColor}
                  backgroundColor={
                    courseLandingPage!.header.callToActionBackgroundColor
                  }
                  className=" tw-rounded-full tw-flex tw-transition-transform hover:-tw-translate-y-1  tw-flex-col tw-justify-center tw-px-6 tw-py-3 tw-normal-case tw-text-lg"
                >
                  Kup dostęp za {data.getCourse.price} zł
                </CreateAccountLeadButton>
              </Link>
            </Box>
          </Box>
          <Box className="tw-hidden lg:tw-flex lg:tw-flex-col lg:tw-col-span-4 xl:tw-col-span-3 lg:tw-relative ">
            <FixedCourseCard
              slug={slug}
              className="tw-fixed tw-top-16 xl:tw-top-[unset]"
              imageUrl={
                courseLandingPage?.fixedCard.imageKey
                  ? await signAmplifyServerImage(
                      courseLandingPage?.fixedCard.imageKey
                    )
                  : null
              }
              title={data.getCourse.title}
              price={data.getCourse.price ?? 0}
              discountPrice={data.getCourse.discountPrice ?? undefined}
              priceTextColor={courseLandingPage?.fixedCard.priceTextColor}
              discountPriceTextColor={
                courseLandingPage?.fixedCard.discountPriceTextColor
              }
              featureCheckboxBackgroundColor={
                courseLandingPage?.fixedCard.featureCheckboxBackgroundColor
              }
              featureCheckboxTextColor={
                courseLandingPage?.fixedCard.featureCheckboxTextColor
              }
              featureTextColor={courseLandingPage?.fixedCard.featureTextColor}
              buttonTextColor={
                courseLandingPage?.fixedCard.buttonTextColor ?? '#000000'
              }
              buttonBackgroundColor={
                courseLandingPage?.fixedCard.buttonBackgroundColor ?? '#000000'
              }
              backgroundColor={courseLandingPage?.fixedCard.backgroundColor}
            />
          </Box>
        </Container>
      </Box>
      {await Promise.all(
        (courseLandingPage?.sections ?? []).map(async (section, index) => {
          if (section?.features) {
            return (
              <Box
                key={index}
                sx={{ backgroundColor: section.backgroundColor }}
                component="section"
              >
                <Container maxWidth="xl" className="tw-grid lg:tw-grid-cols-12">
                  <Box className="xl:tw-col-start-2 tw-col-span-8 tw-flex tw-flex-col md:tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 md:tw-gap-8 lg:tw-gap-4 md:tw-space-y-0 tw-space-y-8 tw-my-12 lg:tw-my-16">
                    {section.features.items!.map((feature, index) => {
                      return (
                        <Box
                          key={index}
                          className={`tw-flex tw-items-center tw-space-x-4 `}
                        >
                          <Box
                            sx={{
                              backgroundColor: feature?.backgroundColor,
                            }}
                            className={`tw-grid tw-place-content-center tw-p-4 lg:tw-p-3 tw-w-min tw-rounded-full`}
                          >
                            <Box
                              sx={{
                                color: feature?.iconColor,
                              }}
                            >
                              {React.cloneElement(FEATURES[index].icon, {
                                className: 'lg:tw-text-xl xl:tw-text-2xl',
                              })}
                            </Box>
                          </Box>
                          <Typography
                            sx={{
                              color: feature?.textColor,
                            }}
                            className="xl:tw-text-lg"
                          >
                            {FEATURES[index].text}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Container>
              </Box>
            );
          }
          if (section?.aboutCourse) {
            const html = convertJSONToRichTextHTML(section.aboutCourse.content);

            return (
              <Box
                key={index}
                sx={{ backgroundColor: section.backgroundColor }}
                component={'section'}
              >
                <Container
                  maxWidth="xl"
                  className="tw-grid lg:tw-grid-cols-12 tw-py-12 lg:tw-py-16 tw-gap-8"
                >
                  <Box className="xl:tw-col-start-2 tw-col-span-8 tw-flex tw-flex-col tw-items-center ">
                    <Typography
                      sx={{ color: section.aboutCourse.titleTextColor }}
                      className="tw-text-4xl sm:tw-text-5xl  tw-font-extrabold tw-text-center"
                    >
                      {section.aboutCourse.title}
                    </Typography>
                    <Box
                      className="richText tw-mt-4 md:tw-mt-8 tw-text-lg"
                      sx={{ color: section.aboutCourse.contentTextColor }}
                    >
                      <div
                        dangerouslySetInnerHTML={
                          html ? { __html: html } : undefined
                        }
                      />
                    </Box>
                  </Box>
                </Container>
              </Box>
            );
          }
          if (section?.subjects) {
            return (
              <Box
                key={index}
                sx={{ backgroundColor: section.backgroundColor }}
                component={'section'}
              >
                <Container
                  maxWidth="xl"
                  className="tw-grid lg:tw-grid-cols-12 tw-py-12 lg:tw-py-16 tw-gap-8"
                >
                  <Box className="xl:tw-col-start-2 tw-col-span-8 tw-flex tw-flex-col tw-items-center tw-text-center">
                    <Typography
                      sx={{ color: section.subjects.titleTextColor }}
                      className="tw-text-4xl sm:tw-text-5xl tw-font-extrabold"
                    >
                      {section.subjects.title}
                    </Typography>
                    <Typography
                      sx={{ color: section.subjects.subtitleTextColor }}
                      className="tw-max-w-[400px] md:tw-max-w-[500px] tw-text-lg  xl:tw-text-xl  tw-mt-4 tw-text-secondary-main"
                    >
                      {section.subjects.subtitle}
                    </Typography>
                  </Box>

                  <Box className="xl:tw-col-start-2 tw-col-span-8 tw-flex tw-flex-col tw-gap-24 lg:tw-gap-24 tw-mt-12">
                    {await Promise.all(
                      (section.subjects.subjects ?? []).map(
                        async (subject, index) => (
                          <Box
                            key={index}
                            className="tw-mx-auto w-max-w-screen-md lg:tw-max-w-screen-lg xl:tw-max-w-screen-xl  tw-flex tw-flex-col  md:tw-grid md:tw-grid-cols-2 tw-gap-8 xl:tw-gap-12"
                          >
                            <Box
                              className={`${
                                index % 2 === 0 ? 'md:tw-order-1' : ''
                              } tw-text-center md:tw-text-left tw-flex tw-flex-col md:tw-justify-center`}
                            >
                              <Typography
                                sx={{
                                  color: subject?.indexColor,
                                }}
                                className={'tw-text-6xl  xl:tw-text-7xl '}
                              >
                                0{index + 1}
                              </Typography>

                              <Typography
                                sx={{
                                  color: subject?.titleTextColor,
                                }}
                                className={
                                  'tw-mt-4  tw-font-bold tw-text-4xl  xl:tw-text-5xl 2xl:tw-text-6xl'
                                }
                              >
                                {subject?.title}
                              </Typography>

                              <Typography
                                sx={{
                                  color: subject?.contentTextColor,
                                }}
                                className={
                                  'tw-mt-2 md:tw-mt-4 xl:tw-mt-8 tw-text-xl lg:tw-text-lg  xl:tw-text-xl 2xl:tw-text-2xl'
                                }
                              >
                                {subject?.content}
                              </Typography>
                            </Box>
                            <Box
                              className={`${
                                index % 2 === 1 ? 'tw-pr-4' : 'tw-pl-4'
                              } tw-mx-auto tw-mt-12 tw-max-w-[400px] md:tw-max-w-[unset]`}
                            >
                              <Box className="tw-flex tw-flex-col  tw-relative tw-aspect-square">
                                <Box
                                  className={`tw-relative tw-z-40 tw-h-full tw-overflow-hidden  ${
                                    index % 2 === 1
                                      ? 'tw-rounded-tr-[3rem] tw-rounded-bl-[3rem]'
                                      : 'tw-rounded-br-[3rem] tw-rounded-tl-[3rem]'
                                  } `}
                                >
                                  {subject?.imageKey && (
                                    <Image
                                      src={await signAmplifyServerImage(
                                        subject?.imageKey
                                      )}
                                      alt={`Zdjęcie tematu: ${subject.title}`}
                                      width={600}
                                      height={600}
                                      className="tw-h-full tw-object-cover"
                                    />
                                  )}
                                </Box>

                                <Box
                                  sx={{
                                    backgroundColor: subject?.imageBoxColor,
                                  }}
                                  className={`${
                                    index % 2 === 0
                                      ? '-tw-left-4'
                                      : '-tw-right-4'
                                  } -tw-bottom-4  tw-w-2/3 tw-h-2/3 tw-absolute`}
                                ></Box>
                              </Box>
                            </Box>
                          </Box>
                        )
                      )
                    )}
                  </Box>
                </Container>
              </Box>
            );
          }
          if (section?.courseContent) {
            return (
              <Box
                key={index}
                sx={{ backgroundColor: section.backgroundColor }}
                component={'section'}
              >
                <Container
                  maxWidth="xl"
                  className="tw-grid lg:tw-grid-cols-12 tw-py-12 lg:tw-py-16 tw-gap-8"
                >
                  <Box className="xl:tw-col-start-2 tw-col-span-8 tw-flex tw-flex-col tw-items-center tw-text-center">
                    <Typography
                      sx={{ color: section.courseContent?.titleTextColor }}
                      className="tw-text-4xl sm:tw-text-5xl tw-font-extrabold"
                    >
                      {section.courseContent?.title}
                    </Typography>
                    <Typography
                      sx={{ color: section.courseContent?.subtitleTextColor }}
                      className="tw-max-w-[400px] md:tw-max-w-[500px] tw-text-lg xl:tw-text-xl  tw-mt-4 tw-text-secondary-main"
                    >
                      {section.courseContent?.subtitle}
                    </Typography>
                  </Box>

                  <Container
                    maxWidth="sm"
                    className="xl:tw-col-start-2 tw-col-span-8 tw-mt-8 tw-flex tw-flex-col tw-space-y-4 tw-px-0 tw-w-full"
                  >
                    {courseSections?.items.length ? (
                      courseSections?.items
                        .sort((a, b) => (a!.position > b!.position ? 1 : -1))
                        .map((courseSection, index) => {
                          if (!courseSection)
                            return 'Wczytywanie sekcji się nie powiodło.';
                          return (
                            <ContentSection
                              {...section.courseContent!}
                              length={
                                courseSection.courseSectionSteps?.items
                                  .length ?? 0
                              }
                              key={courseSection.id}
                              index={index + 1}
                              title={courseSection.title}
                            >
                              {courseSection.courseSectionSteps?.items
                                .sort((a, b) =>
                                  a!.position > b!.position ? 1 : -1
                                )
                                .map((step) => {
                                  if (!step)
                                    return 'Wczytywanie etapu się nie powiodło.';
                                  return (
                                    <ContentSectionStep
                                      {...section.courseContent!}
                                      key={step.id}
                                      title={step.title}
                                      type={step.type}
                                      videoDuration={
                                        step.courseSectionStepVideo?.duration ??
                                        0
                                      }
                                      questionsNumber={
                                        step.courseSectionStepTest?.questions
                                          ?.items.length ?? 0
                                      }
                                    />
                                  );
                                })}
                            </ContentSection>
                          );
                        })
                    ) : (
                      <Typography className="tw-text-center">
                        Ten kurs jest jeszcze w trakcie przygotowywania!
                      </Typography>
                    )}
                  </Container>
                </Container>
              </Box>
            );
          }
          if (
            section?.recommendedCourses &&
            section.recommendedCourses.courseSlugs.length
          ) {
            return (
              <RecommendedCoursesSection
                key={index}
                backgroundColor={section.backgroundColor}
                {...section.recommendedCourses}
              />
            );
          }
        })
      )}
      <Box
        sx={{ backgroundColor: courseLandingPage?.backgroundColor }}
        className="lg:tw-hidden "
        component="section"
      >
        <Container maxWidth="xl" className="tw-grid lg:tw-grid-cols-12">
          <Box className="xl:tw-col-start-2 tw-col-span-8 tw-flex tw-flex-col tw-items-center  tw-my-12 lg:tw-my-16">
            <FixedCourseCard
              slug={slug}
              imageUrl={
                courseLandingPage?.fixedCard.imageKey
                  ? await signAmplifyServerImage(
                      courseLandingPage?.fixedCard.imageKey
                    )
                  : null
              }
              title={data.getCourse.title}
              price={data.getCourse.price ?? 0}
              backgroundColor={courseLandingPage?.backgroundColor}
              discountPrice={data.getCourse.discountPrice ?? undefined}
              priceTextColor={courseLandingPage?.fixedCard.priceTextColor}
              discountPriceTextColor={
                courseLandingPage?.fixedCard.discountPriceTextColor
              }
              descriptionTextColor={
                courseLandingPage?.fixedCard.descriptionTextColor
              }
              featureCheckboxBackgroundColor={
                courseLandingPage?.fixedCard.featureCheckboxBackgroundColor
              }
              featureCheckboxTextColor={
                courseLandingPage?.fixedCard.featureCheckboxTextColor
              }
              featureTextColor={courseLandingPage?.fixedCard.featureTextColor}
              buttonTextColor={
                courseLandingPage?.fixedCard.buttonTextColor ?? '#000000'
              }
              buttonBackgroundColor={
                courseLandingPage?.fixedCard.buttonBackgroundColor ?? '#000000'
              }
            />
          </Box>
        </Container>
      </Box>
      <Box
        sx={{
          backgroundColor: courseLandingPage?.footer.backgroundColor,
        }}
      >
        <Container
          maxWidth="xl"
          className="tw-px-4 tw-pt-8 tw-text-center tw-pb-24 lg:tw-pb-8"
        >
          <Box className=" tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-items-center">
            <Box className="tw-mt-6 md:tw-mt-0 tw-order-2 md:tw-order-1 tw-flex tw-flex-col">
              <Box className="tw-flex tw-flex-col md:tw-flex-row tw-gap-2 md:tw-gap-4">
                <Link href="/polityka_prywatnosci.pdf">
                  <Typography
                    sx={{
                      color: courseLandingPage?.footer.courseDomainTextColor,
                    }}
                  >
                    Polityka prywatności
                  </Typography>
                </Link>
                <Link href="/regulamin.pdf">
                  <Typography
                    sx={{
                      color: courseLandingPage?.footer.courseDomainTextColor,
                    }}
                  >
                    Regulamin
                  </Typography>
                </Link>
              </Box>
              <Typography
                className="tw-mt-2 md:tw-text-left"
                sx={{
                  color: courseLandingPage?.footer.poweredByTextColor,
                }}
              >
                Stwórz swój własny kurs na{' '}
                <Link className="tw-font-bold" href="https://www.learnpool.pl/">
                  LearnPool.pl
                </Link>
              </Typography>
            </Box>
            <a
              className="tw-order-1 md:tw-order-2"
              href="https://www.hotpay.pl/"
            >
              <Image
                src="/assets/system-hotpay-white.png"
                height={44.75}
                width={237.5}
                alt="Płatności obsługuje HOTPAY"
              />
            </a>
          </Box>
        </Container>
      </Box>
    </>
  );
}
