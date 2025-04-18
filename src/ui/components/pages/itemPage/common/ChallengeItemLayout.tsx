import React from "react";
import pageStyles from "@/ui/styles/page.module.css";

export type ChallengeItemLayoutProps = {
  main: React.JSX.Element;
  footer: React.JSX.Element;
};

export function ChallengeItemLayout(props: ChallengeItemLayoutProps) {
  const { main, footer } = props;
  return (
    <div className={pageStyles.page}>
      <main>{main}</main>
      <footer>{footer}</footer>
    </div>
  );
}
