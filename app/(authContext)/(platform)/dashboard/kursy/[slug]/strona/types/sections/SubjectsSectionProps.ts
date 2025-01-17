export type SubjectsSubjectSectionProps = {
  indexColor: string;
  title: string;
  titleTextColor: string;
  content: string;
  contentTextColor: string;
  image: File | string | null;
  imageBoxColor: string;
};

export type SubjectsSectionProps = {
  backgroundColor: string;

  subjects: {
    title: string;
    titleTextColor: string;
    subtitle: string;
    subtitleTextColor: string;
    subjects: SubjectsSubjectSectionProps[];
  };
};
