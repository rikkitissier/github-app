import HelpScout, { NOTIFICATION_TYPES } from "@helpscout/javascript-sdk";
import { Button, DefaultStyle, Heading, Icon } from "@helpscout/ui-kit";
import { useEffect, useState, useRef } from "react";
import { Octokit } from "@octokit/core";
import DropList from "@hsds/drop-list";

function App() {
	const [userEmail, setUserEmail] = useState<string | undefined>("unknown user");
	const [issues, setIssues] = useState<any[]>([]); // TODO: type this as [Octokit.IssuesListForRepoResponseItem]
	const octokit = useRef(new Octokit({ auth: process.env.ACCESS_TOKEN }));

	useEffect(() => {
		const searchIssues = async () => {
			return await octokit.current.request("GET /search/issues", {
				q: "repo:rikkitissier/helpscout-example is:issue is:open",
			});
		};

		searchIssues().then((response) => setIssues(response.data.items));
	}, []);

	useEffect(() => {
		HelpScout.getApplicationContext().then(({ user }) => setUserEmail(user?.email));
	}, []);

	function onClick() {
		HelpScout.showNotification(NOTIFICATION_TYPES.SUCCESS, "Hello from the sidebar app");
	}

	return (
		<div className="App">
			<DefaultStyle />

			<DropList
				toggler={<Button size="sm" />}
				items={[
					{ id: "1", value: "One" },
					{ id: "2", value: "Two" },
					{ id: "3", value: "Three" },
				]}
			/>

			<Heading level="h4">Hi, {userEmail}</Heading>
			<br />
			<Button size="sm" onClick={onClick}>
				<Icon name="plus" />
			</Button>

			{issues.map((issue) => (
				<div key={issue.id}>
					<h1>{issue.title}</h1>
					<p>{issue.body}</p>
				</div>
			))}
		</div>
	);
}

export default App;
