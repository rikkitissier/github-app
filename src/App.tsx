import { useRef, useState, useEffect } from "react";
import { Octokit } from "@octokit/core";
import { DefaultStyle } from "@helpscout/ui-kit";

import HelpScout, { Context } from "@helpscout/javascript-sdk";

import { Main, CreateIssuePopup } from "./screens";
import { OctokitContext } from "./hooks/useOctokitContext";
import { HelpScoutContext } from "./hooks/useHelpscoutContext";

import "./App.css";

function App(): JSX.Element {
  const octokit = useRef<Octokit>(
    new Octokit({ auth: import.meta.env.VITE_GH_ACCESS_TOKEN })
  );
  const urlSearchParams = new URLSearchParams(window.location.search);
  const [helpscoutContext, setHelpscoutContext] = useState({} as Context);

  HelpScout.getApplicationContext().then((context) => {
    console.log(context)
  })
  // useEffect(() => {
  //   const getContext = async () => {
  //     const context = await HelpScout.getApplicationContext();
  //     setHelpscoutContext(context);
  //   };

  //   getContext();
  // }, []);

  // Veeeery naive 'routing' so we can open the app in popup windows
  const renderScreen = () => {
    switch (urlSearchParams.get("do")) {
      case "createIssue":
        return <CreateIssuePopup />;
      default:
        return <Main />;
    }
  };

  return (
    <OctokitContext.Provider value={octokit.current}>
      <HelpScoutContext.Provider value={helpscoutContext}>
        <DefaultStyle />
        {renderScreen()}
      </HelpScoutContext.Provider>
    </OctokitContext.Provider>
  );
}

export default App;
