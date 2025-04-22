export type QuestionOption = {
  id: string;
  text: string;
};

export type Question = {
  id: string;
  prompt: string;
  options: QuestionOption[];
  correctOptionId: string;
  explanation: string;
};

export type Challenge = {
  id: string;
  name: string;
  description: string;
  questions: Question[];
};
