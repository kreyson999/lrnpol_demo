'use client';

import { GetPublicCourseDataQuery } from '@/services/API';
import React, { useContext } from 'react';

type Course = GetPublicCourseDataQuery['getCourse'] & { logo?: string };

type Props = {
  children: React.ReactNode;
  value: Course;
};

const CourseContext = React.createContext<Course | null>(null);

const CourseContextProvider = ({ children, value }: Props) => {
  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};

export default CourseContextProvider;

export const useCourse = () => useContext(CourseContext);
