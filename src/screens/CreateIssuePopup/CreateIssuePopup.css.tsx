// @ts-ignore
import styled, { createGlobalStyle } from "styled-components";
// @ts-ignore
import { SelectTag } from "@hsds/drop-list";

export const PopupBodyStyle = createGlobalStyle`
  body {
    margin: 0;
    --HSUIKitFontSize: 14px;
  }
`;

export const PopupBodyUI = styled("div")`
  background: var(--appBgColor);
  padding: 40px;
  min-height: 100vh;
`;

export const SelectTagUI = styled(SelectTag)`
  width: 100%;
`

export const FormUI = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const RepoSelectorUI = styled("div")`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const RepoSelectorLabelUI = styled("div")`
  font-size: 13px;
  font-weight: 500;
`

export const ToolbarUI = styled('div')`
  display: flex;
	flex-direction: row;
  align-items: center;
	justify-content: space-between;
  height: 100%;
`