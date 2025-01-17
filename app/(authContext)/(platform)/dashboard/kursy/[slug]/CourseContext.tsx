import { GetInstructorContextCourseQuery } from '@/services/API';
import React, { useContext } from 'react';

type CourseContextType = {
  refresh: () => void;
  course: GetInstructorContextCourseQuery['getCourse'];
};

const CourseContext = React.createContext<CourseContextType>({
  refresh: () => {},
  course: null,
});

type Props = {
  children: React.ReactNode;
  value: CourseContextType;
};

const CourseContextProvider = ({ children, value }: Props) => {
  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};

export default CourseContextProvider;

export const useFetchedCourse = () => useContext(CourseContext);
