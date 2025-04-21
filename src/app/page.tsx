"use client";

import { challenge } from "@/data/challenge";
import { ChallengeContainer } from "@/ui/components/ChallengeContainer";

export default function Challenge() {
  return <ChallengeContainer challengeId={challenge.id} />;
}
