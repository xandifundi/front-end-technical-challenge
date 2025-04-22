// import { ChallengeState } from "@/state/types";

// export function calculateChallengeMarks(state: ChallengeState) {
//   const totalMarks = state.items.reduce((acc, item) => {
//     switch (item.kind) {
//       case "TextSnippet": {
//         return acc;
//       }
//       case "MultipleChoiceQuestion": {
//         return acc + item.question.marks;
//       }
//     }
//   }, 0);

//   const marks = state.items.reduce((acc, item) => {
//     switch (item.kind) {
//       case "TextSnippet": {
//         return acc;
//       }
//       case "MultipleChoiceQuestion": {
//         return item.state.kind === "Marked"
//           ? acc + item.state.result.marks
//           : acc;
//       }
//     }
//   }, 0);

//   return { totalMarks, marks };
// }
