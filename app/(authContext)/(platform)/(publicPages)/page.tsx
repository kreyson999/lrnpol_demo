import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import { cookies } from 'next/headers';

import config from '@/amplifyconfiguration.json';

import MBox from '@mui/material/Box';
import MContainer from '@mui/material/Container';
import MTypography from '@mui/material/Typography';
import Button from '@/components/materialUI/Button';
import MCard from '@mui/material/Card';

import MCardMedia from '@mui/material/CardMedia';
import MCardActionArea from '@mui/material/CardActionArea';
import { getCoursesByStatusAndGetSubscriptionPlans } from '@/services/graphql/course/queries';
import { signAmplifyServerImage } from '@/helpers/signAmplifyServerImage';

import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import SentimentSatisfiedRoundedIcon from '@mui/icons-material/SentimentSatisfiedRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import MovieRoundedIcon from '@mui/icons-material/MovieRounded';
import DesktopWindowsRoundedIcon from '@mui/icons-material/DesktopWindowsRounded';
import LiveTvRoundedIcon from '@mui/icons-material/LiveTvRounded';
import { CourseStatus } from '@/services/API';
import CreateCoursePlan from '@/components/shared/CreateCoursePlan';
import { getCurrentUser } from 'aws-amplify/auth/server';
import { runWithAmplifyServerContext } from '@/helpers/runWithAmplifyServerContext';
import ShowcaseVideo from './ShowcaseVideo';

export const revalidate = 60 * 60 * 24;

const page = async () => {
  const benefits = [
    {
      icon: <LanguageRoundedIcon />,
      title: 'Strona sprzedażowa',
      description:
        'Będziesz miał możliwość zaprojektowania własnej strony sprzedażowej kursu za pomocą naszego edytora!',
    },
    {
      icon: <SentimentSatisfiedRoundedIcon />,
      title: 'Zadbaj o kursantów',
      description:
        'Twoi kursanci będą mieli możliwość uczenia się na intuicyjnej i dostępnej na każdym urządzeniu platformie!',
    },
    {
      icon: <AttachMoneyRoundedIcon />,
      title: 'Nie myśl, a zarabiaj!',
      description:
        'Kto zrobi mi stronę? Czy ludzie będa mogli się uczyć? Czy nikt się nie włamie na stronę? - U nas to masz od razu!',
    },
  ];

  const features = [
    {
      title: 'Łatwe dodawanie treści',
      description:
        'Proste i intuicyjne narzędzie do szybkiego publikowania materiałów wideo dla Twoich kursantów!',
      icon: (
        <MovieRoundedIcon className="tw-text-5xl sm:tw-text-6xl lg:tw-text-7xl" />
      ),
    },
    {
      title: 'Własna strona sprzedażowa',
      description:
        'Edytor do tworzenia spersonalizowanej witryny umożliwiającej skuteczną sprzedaż Twoich produktów cyfrowych bez potrzeby znajomości kodowania.',
      icon: (
        <DesktopWindowsRoundedIcon className="tw-text-5xl sm:tw-text-6xl lg:tw-text-7xl" />
      ),
    },
    {
      title: 'Prosty interfejs użytkownika',
      description:
        'Przejrzysty interfejs, który ułatwia komfortowe oglądanie kursu, pozwalając skupić się na nauce bez zbędnych rozpraszaczy.',
      icon: (
        <LiveTvRoundedIcon className="tw-text-5xl sm:tw-text-6xl lg:tw-text-7xl" />
      ),
    },
  ];

  const amplifyServerClient = generateServerClientUsingCookies({
    config,
    cookies,
    authMode: 'apiKey',
  });

  const { data } = await amplifyServerClient.graphql({
    query: getCoursesByStatusAndGetSubscriptionPlans,
    variables: {
      status: CourseStatus.PUBLISHED,
    },
  });

  let isAuthenticated = false;
  try {
    const user = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (contextSpec) => getCurrentUser(contextSpec),
    });
    isAuthenticated = !!user;
  } catch (error) {
    isAuthenticated = false;
  }

  return (
    <>
      <MBox component="header" className="tw-bg-grid">
        <MContainer className="tw-flex tw-flex-col md:tw-grid md:tw-grid-cols-2 tw-items-center tw-px-4 tw-py-12 tw-gap-12 lg:tw-py-16">
          <MBox className="tw-flex tw-flex-col tw-items-center md:tw-items-start tw-gap-6 sm:tw-gap-8 md:tw-gap-6 lg:tw-gap-8 xl:tw-gap-10 tw-text-white tw-text-center md:tw-text-left">
            <MTypography
              variant="h1"
              className="tw-text-3xl sm:tw-text-4xl md:tw-text-3xl lg:tw-text-4xl xl:tw-text-5xl tw-leading-tight xl:tw-leading-tight tw-font-black"
            >
              Stwórz swój kurs i na nim zarabiaj!
            </MTypography>
            <MTypography
              variant="body1"
              className="sm:tw-text-lg md:tw-text-base lg:tw-text-lg tw-text-secondary-contrastText"
            >
              Stwórz z nami swój własny kurs, pomagaj innym i zagwarantuj sobie
              pasywny dochód!
            </MTypography>
            <MBox className="tw-w-fit">
              <Button
                href={
                  isAuthenticated
                    ? '/dashboard/kursy/stworz'
                    : '/stworzkonto?action=stworzkurs'
                }
                primary
              >
                Zacznij tworzyć kurs
              </Button>
            </MBox>
          </MBox>
          <MBox>
            <Image
              src="/assets/stan_sie_lepszy.svg"
              width={500}
              height={500}
              priority
              alt="Zdjęcie przedstawiające człowieka przeglądające się w lustrze. W lustrze jest lepszą wersją siebie."
            />
          </MBox>
        </MContainer>
      </MBox>
      <MContainer
        component="section"
        className="tw-mt-16 md:tw-mt-20 tw-mb-24 "
      >
        <MTypography
          className="tw-uppercase tw-text-2xl sm:tw-text-3xl lg:tw-text-4xl tw-font-semibold tw-text-white tw-text-center tw-mb-12"
          variant="h2"
        >
          Korzyści z tworzenia{' '}
          <span className="tw-text-primary-main">kursu z nami</span>
        </MTypography>
        <MBox className="tw-grid sm:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-4 lg:tw-gap-6">
          {benefits.map((benefit) => (
            <MBox
              key={benefit.title}
              className="tw-drop-shadow-lg tw-group tw-border tw-border-primary-light tw-p-4 tw-text-white tw-rounded-xl tw-flex tw-flex-col"
            >
              <MBox className="tw-rounded-lg tw-grid tw-place-content-center tw-min-h-12 tw-w-12 tw-bg-primary-main">
                {benefit.icon}
              </MBox>
              <MTypography className="tw-mt-4 tw-text-xl md:tw-text-2xl tw-font-semibold">
                {benefit.title}
              </MTypography>
              <MTypography className="tw-mt-2 md:tw-text-base tw-text tw-h-full tw-text-sm tw-grow tw-text-secondary-contrastText">
                {benefit.description}
              </MTypography>
            </MBox>
          ))}
        </MBox>
      </MContainer>
      <MContainer
        component="section"
        className="tw-mb-24 lg:tw-mb-36 lg:tw-mt-16 "
      >
        <MTypography
          className="tw-uppercase tw-text-2xl sm:tw-text-3xl lg:tw-text-4xl tw-font-semibold tw-text-white tw-text-center tw-mb-12"
          variant="h2"
        >
          Stwórz <span className="tw-text-primary-main">swój pierwszy </span>
          kurs
        </MTypography>
        <ShowcaseVideo />
      </MContainer>
      <MContainer
        component="section"
        className="tw-mb-24 lg:tw-mb-36 lg:tw-mt-16 "
      >
        <MTypography
          className="tw-uppercase tw-text-2xl sm:tw-text-3xl lg:tw-text-4xl tw-font-semibold tw-text-white tw-text-center tw-mb-12"
          variant="h2"
        >
          <span className="tw-text-primary-main">Kursy</span>, które obsługujemy
        </MTypography>
        <MBox className="tw-grid sm:tw-grid-cols-2 md:tw-grid-cols-3 tw-gap-4 lg:tw-gap-6">
          {await Promise.all(
            data.courseByStatus.items
              .filter(
                (course) => !!course.courseLandingPage?.fixedCard.imageKey
              )
              .map(async (course) => {
                const { imageKey } = course.courseLandingPage!.fixedCard;
                return (
                  <Link
                    className="tw-mx-auto tw-max-w-[350px]"
                    key={course.slug}
                    href={`https://${course.slug}.${process.env.NEXT_PUBLIC_BASE_URL}`}
                  >
                    <MCard
                      elevation={0}
                      className={`tw-drop-shadow-lg tw-border tw-border-primary-light  tw-rounded-xl tw-bg-background-default tw-flex tw-flex-col`}
                    >
                      <MCardActionArea>
                        <MCardMedia sx={{ position: 'relative' }}>
                          <Image
                            src={await signAmplifyServerImage(imageKey!)}
                            width={640}
                            height={360}
                            alt={`Zdjęcie kursu ${course.title}`}
                            style={{ objectFit: 'cover' }}
                          />
                        </MCardMedia>
                      </MCardActionArea>
                    </MCard>
                  </Link>
                );
              })
          )}
        </MBox>
      </MContainer>
      {features.map((feature, index) => (
        <MBox
          key={feature.title}
          className={index % 2 === 0 ? 'tw-bg-primary-main' : ''}
        >
          <MContainer
            maxWidth="md"
            className="tw-flex tw-flex-col tw-items-center tw-text-center tw-py-16 md:tw-py-24 tw-text-white"
          >
            {feature.icon}

            <MTypography
              variant="h3"
              className="tw-mt-12 lg:tw-mt-16 tw-text-3xl sm:tw-text-4xl lg:tw-text-5xl tw-font-black tw-uppercase"
            >
              {feature.title}
            </MTypography>
            <MTypography className="tw-mt-6 lg:tw-mt-10 lg:tw-text-lg">
              {feature.description}
            </MTypography>
          </MContainer>
        </MBox>
      ))}
      <MContainer
        component="section"
        maxWidth="lg"
        className="tw-flex tw-flex-col tw-items-center tw-mt-16 md:tw-mt-20 lg:tw-mt-36 tw-mb-24 "
      >
        <MTypography
          className="tw-uppercase tw-text-2xl sm:tw-text-3xl lg:tw-text-4xl tw-font-semibold tw-text-white tw-text-center tw-mb-12"
          variant="h2"
        >
          Ceny dopasowane do{' '}
          <span className="tw-text-primary-main">Ciebie</span>
        </MTypography>
        <MBox className="tw-grid sm:tw-grid-cols-2 tw-max-w-screen-md  tw-gap-4 lg:tw-gap-6">
          {data.listCourseSubscriptionPlans.items
            .sort((a, b) => (a.price > b.price ? 1 : -1))
            .map((plan) => (
              <CreateCoursePlan
                actionType="NAVIGATE_TO_DASHBOARD"
                key={plan.name}
                plan={plan}
                href={
                  isAuthenticated
                    ? '/dashboard/kursy/stworz'
                    : '/stworzkonto?action=stworzkurs'
                }
              />
            ))}
        </MBox>
      </MContainer>
      <MContainer
        component="section"
        className="tw-mt-8 md:tw-mt-12 lg:tw-mt-16  tw-mb-24 "
      >
        <MTypography
          className="tw-uppercase tw-text-2xl sm:tw-text-3xl lg:tw-text-4xl tw-font-semibold tw-text-white tw-text-center tw-mb-12"
          variant="h2"
        >
          Nie czekaj i zacznij{' '}
          <span className="tw-text-primary-main">zarabiać!</span>
        </MTypography>
        <MBox className="tw-flex tw-justify-center tw-items-center">
          <Button
            href={
              isAuthenticated
                ? '/dashboard/kursy/stworz'
                : '/stworzkonto?action=stworzkurs'
            }
            primary
          >
            Zacznij tworzyć kurs
          </Button>
        </MBox>
      </MContainer>
    </>
  );
};

export default page;
