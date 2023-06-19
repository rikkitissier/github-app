import { useEffect, useState, useRef } from "react";
import { Button } from "@helpscout/ui-kit";
import SimpleModal, { HeaderAndFooter } from "@hsds/simple-modal";
import DropList from "@hsds/drop-list";
import Input from "@hsds/input";
import Checkbox from "@hsds/checkbox";

import type { CreateIssuePayload, Repository, DropListItem } from "../../types";

import { useOctokitContext } from "../../hooks/useOctokitContext";
import { PopupBodyStyle, ToolbarUI, SelectTagUI, FormUI, RepoSelectorUI, RepoSelectorLabelUI } from "./CreateIssuePopup.css";

const CreateIssuePopup = (): JSX.Element => {
	const octokit = useOctokitContext();
	const [repos, setRepos] = useState<Repository[]>([]);
	const [selectedRepo, setSelectedRepo] = useState<DropListItem | null>(null);
	const [bodyContent, setBodyContent] = useState<string>("");
	const [includeMessage, setIncludeMessage] = useState<boolean>(true);

	useEffect(() => {
		const userRepos = async () => {
			return await octokit!.request("GET /user/repos?affiliation=owner&per_page=100");
		};

		userRepos().then((response) => {
			const reposToList: Repository[] = response.data.filter((repo: Repository) => repo.has_issues);
			setRepos(reposToList);
		});
	}, []);

	const closePopup = () => {
		window.close();
	}

	const submitIssue = () => {
		window.opener.postMessage(
			{
				type: "createIssue",
				payload: {
					repo: selectedRepo?.value,
					body: bodyContent,
					includeMessage,
				} as CreateIssuePayload,
			},
			"*"
		);
	};

	return (
		<>
			<PopupBodyStyle />
			<SimpleModal show width="calc(100% - 100px)" height="calc(100% - 100px)" withCloseButton={false}>
				<HeaderAndFooter
					withSimpleBar
					heading="Create GitHub Issue"
					footer={
						<ToolbarUI>
							<Button onClick={closePopup} styled="linked" theme="grey">
								Cancel
							</Button>
							<Button onClick={submitIssue} theme="blue" size="md">
								Create Issue
							</Button>
						</ToolbarUI>
					}
				>
					<FormUI>
						<RepoSelectorUI>
							<DropList
								autoSetComboboxAt={10}
								inputPlaceholder="Choose repo..."
								toggler={<SelectTagUI text={selectedRepo?.value || "Select repo..."} />}
								items={repos.map((repo) => ({
									id: repo.id.toString(),
									value: repo.full_name,
								}))}
								onSelect={(selection: DropListItem) => {
									setSelectedRepo(selection);
								}}
							/>
						</RepoSelectorUI>
						<Input multiline={16} value={bodyContent} onChange={(value: string) => setBodyContent(value)} placeholder="Enter some information about this issue" />
						<Checkbox label="Include original message in issue body" checked={includeMessage} onChange={() => setIncludeMessage(!includeMessage)} />
					</FormUI>
				</HeaderAndFooter>
			</SimpleModal>
		</>
	);
};

export { CreateIssuePopup };
