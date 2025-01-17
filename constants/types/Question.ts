export type Question = {
  id: string;
  text: string;
  answers: Array<{
    id: string;
    text: string | null;
    imageKey: string | null;
  }>;
  correctAnswers: string[];
};
