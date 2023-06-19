import { Button, Heading, Icon } from "@helpscout/ui-kit";
import IssueList from "./components/IssueList";
import { useMessageListener } from "../../hooks/useMessageListener";
import { useOctokitContext } from "../../hooks/useOctokitContext";
import { useHelpScoutContext } from "../../hooks/useHelpscoutContext";

import type { CreateIssuePayload } from "../../types";
import { generateIssueBody } from "./Main.utils";

const Main = (): JSX.Element => {
  const octokit = useOctokitContext();
  const ghVersion = import.meta.env.VITE_GH_API_VERSION;
  const helpscout = useHelpScoutContext()

  useMessageListener("createIssue", (payload: CreateIssuePayload) => {
    if( !helpscout?.conversation ) return null

    const body = generateIssueBody(payload.body, helpscout.conversation);

    octokit!.request(`POST /repos/${payload.repo}/issues`, {
      title: "Found a bug",
      body,
      headers: {
        "X-GitHub-Api-Version": ghVersion,
      },
    });
  });

  const openCreateIssue = (): void => {
    window.open(
      window.location.href + `&do=createIssue`,
      "_blank",
      "popup,width=1000,height=700,location=no"
    );
  };

  return (
    <div className="App">
      <Button
        className="cButton--fullWidth"
        theme="grey"
        styled="outlined"
        onClick={openCreateIssue}
      >
        Create an issue
      </Button>

      <IssueList />
    </div>
  );
};

export { Main };
