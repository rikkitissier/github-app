import HelpScout, { NOTIFICATION_TYPES, ConfirmNotificationOptions } from "@helpscout/javascript-sdk";
import { Button, DefaultStyle, Heading, Icon } from "@helpscout/ui-kit";
import { useEffect, useState, useRef } from "react";
import { Octokit } from "@octokit/core";
import DropList from "@hsds/drop-list";

import "./App.css";

interface Repository {
	id: number;
	full_name: string;
	has_issues: boolean;
}

interface DropListItem {
	id: string;
	value: string;
}

function App() {
	const [repos, setRepos] = useState<Repository[]>([]);
	const octokit = useRef<Octokit>(new Octokit({ auth: import.meta.env.VITE_GH_ACCESS_TOKEN }));
	const urlSearchParams = new URLSearchParams(window.location.search);

	useEffect(() => {
		const userRepos = async () => {
			return await octokit.current.request("GET /user/repos?affiliation=owner&per_page=100");
		};

		userRepos().then((response) => {
			const reposToList: Repository[] = response.data.filter((repo: Repository) => repo.has_issues);
			setRepos(reposToList);
		});
	}, []);

	const handleOnSelectRepo = (selected: DropListItem) => {
		window.open(window.location.href + `?repo=${selected.value}`, "_blank", "popup,width=1000,height=700,location=no");
	};

	if (urlSearchParams.has("repo")) {
		return (
			<div className="App">
				<DefaultStyle />
				<Heading size="lg">Create an issue</Heading>
				{urlSearchParams.get("repo")}
				<Button className="cButton--fullWidth" theme="grey" styled="outlined" onClick={() => {}}>
					Create Issue
				</Button>
			</div>
		);
	}

	return (
		<div className="App">
			<DefaultStyle />

			<DropList
				autoSetComboboxAt={10}
				inputPlaceholder="Choose repo..."
				toggler={
					<Button className="cButton--fullWidth" theme="grey" styled="outlined">
						Create an issue
					</Button>
				}
				items={repos.map((repo) => ({
					id: repo.id.toString(),
					value: repo.full_name,
				}))}
				onSelect={handleOnSelectRepo}
			/>
		</div>
	);
}

export default App;
