// import type {
//   Challenge,
//   MultipleChoiceQuestion,
//   TextSnippet,
//   ChallengeSession,
//   ChallengeSessionItem_MultipleChoiceQuestion,
//   MultipleChoiceQuestionState,
// } from "@/domain/types";
// import type {
//   ChallengeState,
//   ChallengeStateItem,
//   ChallengeStateItem_MultipleChoiceQuestion,
//   ChallengeStateItem_TextSnippet,
// } from "./types";

// function makeMultipleChoiceQuestionItem(
//   question: MultipleChoiceQuestion,
//   sessionItem: ChallengeSessionItem_MultipleChoiceQuestion | null
// ): ChallengeStateItem_MultipleChoiceQuestion {
//   const state: MultipleChoiceQuestionState = sessionItem
//     ? sessionItem.state
//     : { kind: "NotMarked", selectedOptionId: null };
//   return {
//     kind: "MultipleChoiceQuestion",
//     question,
//     state,
//   };
// }

// function makeTextSnippetItem(
//   page: TextSnippet
// ): ChallengeStateItem_TextSnippet {
//   return {
//     kind: "TextSnippet",
//     snippet: page,
//   };
// }

// export type MakeItemsProps = {
//   challenge: Challenge;
//   challengeSession: ChallengeSession;
// };

// function makeItems(props: MakeItemsProps): ChallengeStateItem[] {
//   const { challenge, challengeSession } = props;

//   return challenge.items.map((item, index) => {
//     const baseSessionItem = challengeSession.items[index] ?? null;

//     switch (item.kind) {
//       case "MultipleChoiceQuestion": {
//         const sessionItem = baseSessionItem
//           ? baseSessionItem.kind === "MultipleChoiceQuestion"
//             ? baseSessionItem
//             : null
//           : null;
//         return makeMultipleChoiceQuestionItem(item, sessionItem);
//       }
//       case "TextSnippet":
//         return makeTextSnippetItem(item);
//     }
//   });
// }

// export type MakeInitialStateProps = {
//   challenge: Challenge;
//   challengeSession: ChallengeSession;
// };

// export function makeInitialState(props: MakeInitialStateProps): ChallengeState {
//   const { challenge, challengeSession } = props;

//   const items = makeItems({ challenge, challengeSession });

//   return {
//     challenge,
//     items,
//     page: { kind: "StartPage" },
//   };
// }
