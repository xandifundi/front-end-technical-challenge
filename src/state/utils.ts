import type {
  ChallengeState,
  MultipleChoiceQuestionItem,
  ChallengePage_ItemPage,
} from "./types";

export function getItemPage(
  state: ChallengeState
): ChallengePage_ItemPage | null {
  const { page } = state;
  return page.kind === "ItemPage" ? page : null;
}

export function getMultipleChoiceQuestionItem(
  state: ChallengeState
): MultipleChoiceQuestionItem | null {
  const itemPage = getItemPage(state);

  if (!itemPage) {
    return null;
  }

  const item = state.items[itemPage.itemIndex];

  if (item.kind !== "MultipleChoiceQuestion") {
    return null;
  }

  return item;
}
