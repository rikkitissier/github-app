import { Button, DefaultStyle, Heading, Icon } from "@helpscout/ui-kit";

import { PopupUI, PopupBodyStyle } from "./CreateIssuePopup.css";

const CreateIssuePopup = (): JSX.Element => {
  return (
    <>
      <DefaultStyle />
      <PopupBodyStyle />
      <PopupUI>My PopupUI</PopupUI>
    </>
  );
};

export { CreateIssuePopup };
