import HelpScout, { NOTIFICATION_TYPES, ConfirmNotificationOptions } from "@helpscout/javascript-sdk";
import { Button, DefaultStyle, Heading, Icon } from "@helpscout/ui-kit";
import { useEffect, useState, useRef } from "react";
import { Octokit, Repository } from "@octokit/core";
import DropList from "@hsds/drop-list";

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

	useEffect(() => {
		const userRepos = async () => {
			return await octokit.current.request("GET /user/repos");
		};

		userRepos().then((response) => {
			const reposToList = response.data.filter((repo: Repository) => repo.has_issues);
			setRepos(reposToList);
		});
	}, []);

	const handleOnSelectRepo = (selected: DropListItem) => {
    HelpScout.getConfirmNotificationConfirmed().then((confirmed) => {
      console.log(confirmed)
    })

		HelpScout.showNotification(NOTIFICATION_TYPES.CONFIRM, "Create new issue?", {
			body: `Are you sure you want to link this conversation to a new issue in <strong>${selected.value}</strong>?`,
		} as ConfirmNotificationOptions);
	};

	return (
		<div className="App">
			<DefaultStyle />

			<DropList autoSetComboboxAt={10} inputPlaceholder="Choose repo..." toggler={<Button>Create an issue</Button>} items={repos.map((repo) => ({ id: repo.id.toString(), value: repo.full_name }))} onSelect={handleOnSelectRepo} />
		</div>
	);
}

export default App;
