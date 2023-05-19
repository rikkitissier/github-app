import { useEffect, useState, useRef } from "react";
import { Button, DefaultStyle, Heading, Icon } from "@helpscout/ui-kit";
import SimpleModal, { HeaderAndFooter } from "@hsds/simple-modal";
import { Octokit } from "@octokit/core";
import DropList from "@hsds/drop-list";
import Input from "@hsds/input";

import { PopupBodyUI, PopupBodyStyle, ToolbarUI, SelectTagUI, FormUI, RepoSelectorUI, RepoSelectorLabelUI } from "./CreateIssuePopup.css";

interface Repository {
	id: number;
	full_name: string;
	has_issues: boolean;
}

interface DropListItem {
	id: string;
	value: string;
}

const CreateIssuePopup = (): JSX.Element => {
	const [repos, setRepos] = useState<Repository[]>([]);
	const octokit = useRef<Octokit>(new Octokit({ auth: import.meta.env.VITE_GH_ACCESS_TOKEN }));

	useEffect(() => {
		const userRepos = async () => {
			return await octokit.current.request("GET /user/repos?affiliation=owner&per_page=100");
		};

		userRepos().then((response) => {
			const reposToList: Repository[] = response.data.filter((repo: Repository) => repo.has_issues);
			setRepos(reposToList);
		});
	}, []);

	return (
		<>
			<DefaultStyle />
			<PopupBodyStyle />
			<SimpleModal show width="calc(100% - 100px)" height="calc(100% - 100px)" withCloseButton={false}>
				<HeaderAndFooter
					withSimpleBar
					heading="Create GitHub Issue"
					footer={
						<ToolbarUI>
							<Button onClick={() => {}} styled="linked" theme="grey">
								Cancel
							</Button>
							<Button onClick={() => {}} theme="blue" size="lg">
								Create Issue
							</Button>
						</ToolbarUI>
					}
				>
					<FormUI>
						<RepoSelectorUI>
							<RepoSelectorLabelUI>Repository</RepoSelectorLabelUI>
							<DropList
								autoSetComboboxAt={10}
								inputPlaceholder="Choose repo..."
								toggler={<SelectTagUI placeholder="Select repo..." />}
								items={repos.map((repo) => ({
									id: repo.id.toString(),
									value: repo.full_name,
								}))}
								onSelect={() => {}}
							/>
						</RepoSelectorUI>
						<Input multiline={20} placeholder="Enter some information about this issue" />
					</FormUI>
				</HeaderAndFooter>
			</SimpleModal>
		</>
	);
};

export { CreateIssuePopup };
