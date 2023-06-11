import { useEffect } from "react";
import { Button, DefaultStyle, Heading, Icon } from "@helpscout/ui-kit";

import IssueList from "./components/IssueList";
import { useMessageListener } from "../../hooks/useMessageListener";

const Main = (): JSX.Element => {
  
  const createIssue = (payload: object) => {
    console.log(payload)
  }
  
  useMessageListener('createIssue', createIssue);

  const openCreateIssue = (): void => {
    window.open(window.location.href + `?do=createIssue`, "_blank", "popup,width=1000,height=700,location=no");
  };

	return (
    <div className="App">
      <DefaultStyle />

      <Button className="cButton--fullWidth" theme="grey" styled="outlined" onClick={openCreateIssue}>
        Create an issue
      </Button>

      <IssueList />
    </div>
  )
}

export { Main };