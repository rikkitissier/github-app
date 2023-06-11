import { useRef } from "react";
import { Octokit } from "@octokit/core";

import { Main, CreateIssuePopup } from "./screens";
import { OctokitContext } from "./hooks/useOctokitContext";

import "./App.css";

function App(): JSX.Element {
	const octokit = useRef<Octokit>(new Octokit({ auth: import.meta.env.VITE_GH_ACCESS_TOKEN }));
	const urlSearchParams = new URLSearchParams(window.location.search);

  // Veeeery naive 'routing' so we can open the app in popup windows
  const renderScreen = () => {
    switch (urlSearchParams.get("do")) {
      case "createIssue":
        return <CreateIssuePopup />;
      default:
        return <Main />;
    }
  }

	return (
		<OctokitContext.Provider value={octokit.current}>
			{renderScreen()}
		</OctokitContext.Provider>
	);
}

export default App;
