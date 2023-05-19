import { Button, DefaultStyle, Heading, Icon } from "@helpscout/ui-kit";
import { useEffect, useState, useRef } from "react";

import CreateIssuePopup from "./components/CreateIssuePopup";

import "./App.css";

function App(): JSX.Element {
	const urlSearchParams = new URLSearchParams(window.location.search);

	const openCreateIssue = (): void => {
		window.open(window.location.href + `?do=createIssue`, "_blank", "popup,width=1000,height=700,location=no");
	};

	if (urlSearchParams.has("do") && urlSearchParams.get("do") === "createIssue") {
		return <CreateIssuePopup />;
	}

	return (
		<div className="App">
			<DefaultStyle />

			<Button className="cButton--fullWidth" theme="grey" styled="outlined" onClick={openCreateIssue}>
				Create an issue
			</Button>
		</div>
	);
}

export default App;
