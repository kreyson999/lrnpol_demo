'use client';

import React from 'react';

// import MBox from '@mui/material/Box';
import PageLoader from '@/components/shared/PageLoader';

const Page = () => {
  // const setErrorMessage = useErrorState();
  // const router = useRouter();

  // const [isLoading, setIsLoading] = useState(false);
  // const [course, setCourse] =
  //   useState<UserCourseWithSectionsStepsVideos | null>(null);

  // const fetchCourse = useCallback(async () => {
  //   try {
  //     const response = await getUserCourseWithSectionsStepsVideos(params.slug);
  //     setCourse(response);
  //   } catch (error) {
  //     console.log('brak dostępu', error);
  //     // setErrorMessage(
  //     //   `Nie masz dostępu do tego kursu. Skontatkuj się z administratorem!`
  //     // );
  //     // router.push('/app/kursy');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [params.slug]);

  // useEffect(() => {
  //   void fetchCourse();
  // }, [fetchCourse]);

  return <PageLoader isLoading={true}>Trwa ładowanie etapów...</PageLoader>;
};

export default Page;
