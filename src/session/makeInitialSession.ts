// import type {
//   Challenge,
//   ChallengeSession,
//   ChallengeSessionItem,
//   ChallengeSessionItem_MultipleChoiceQuestion,
//   ChallengeSessionItem_TextSnippet,
// } from "@/domain/types";

// export type MakeInitialSessionParams = {
//   challenge: Challenge;
// };

// export function makeInitialSession({
//   challenge,
// }: MakeInitialSessionParams): ChallengeSession {
//   const items: ChallengeSessionItem[] = challenge.items.map((challengeItem) => {
//     switch (challengeItem.kind) {
//       case "TextSnippet": {
//         const sessionItem: ChallengeSessionItem_TextSnippet = {
//           kind: "TextSnippet",
//           itemId: challengeItem.id,
//         };
//         return sessionItem;
//       }
//       case "MultipleChoiceQuestion": {
//         const sessionItem: ChallengeSessionItem_MultipleChoiceQuestion = {
//           kind: "MultipleChoiceQuestion",
//           itemId: challengeItem.id,
//           state: { kind: "NotMarked", selectedOptionId: null },
//         };
//         return sessionItem;
//       }
//     }
//   });

//   const session: ChallengeSession = {
//     challengeId: challenge.id,
//     items,
//   };

//   return session;
// }
