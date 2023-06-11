import { useEffect } from "react";
import { Button, DefaultStyle, Heading, Icon } from "@helpscout/ui-kit";

import IssueList from "./components/IssueList";

const Main = (): JSX.Element => {
  useEffect(() => {
		window.addEventListener("message", handleMessage);
		return () => window.removeEventListener("message", handleMessage);
	}, []);

  const openCreateIssue = (): void => {
		window.open(window.location.href + `?do=createIssue`, "_blank", "popup,width=1000,height=700,location=no");
	};

	const handleMessage = (event: MessageEvent) => {
		console.log(event);
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