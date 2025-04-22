// import {
//   MultipleChoiceQuestion,
//   MultipleChoiceQuestionState,
//   TextSnippet,
//   Challenge,
// } from "@/domain/types";

// export type ChallengeStateItem_MultipleChoiceQuestion = {
//   kind: "MultipleChoiceQuestion";
//   question: MultipleChoiceQuestion;
//   state: MultipleChoiceQuestionState;
// };

// export type ChallengeStateItem_TextSnippet = {
//   kind: "TextSnippet";
//   snippet: TextSnippet;
// };

// export type ChallengeStateItem =
//   | ChallengeStateItem_TextSnippet
//   | ChallengeStateItem_MultipleChoiceQuestion;

// export type ChallengePage_StartPage = { kind: "StartPage" };

// export type ChallengePage_ResultsPage = {
//   kind: "ResultsPage";
//   totalMarks: number;
//   marks: number;
// };

// export type ChallengePage_ItemPage = { kind: "ItemPage"; itemIndex: number };

// export type ChallengePage =
//   | ChallengePage_StartPage
//   | ChallengePage_ResultsPage
//   | ChallengePage_ItemPage;

// export type ChallengeState = {
//   challenge: Challenge;
//   items: ChallengeStateItem[];
//   page: ChallengePage;
// };
