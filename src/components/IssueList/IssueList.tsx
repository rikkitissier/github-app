import { useEffect, useState, useRef } from "react";
import { Button, DefaultStyle, Heading, Icon } from "@helpscout/ui-kit";
import { Octokit } from "@octokit/core";

interface Repository {
	id: number;
	full_name: string;
	has_issues: boolean;
}

const IssueList = (): JSX.Element => {
	const [repos, setRepos] = useState<Repository[]>([]);
	const octokit = useRef<Octokit>(new Octokit({ auth: import.meta.env.VITE_GH_ACCESS_TOKEN }));

	useEffect(() => {
		const issues = async () => {
			return await octokit.current.request(`GET /search/issues?q=${encodeURIComponent("test is:issue user:rikkitissier")}`);
		};

		issues().then((response) => {
			console.log(response);
		});

		// userRepos().then((response) => {
		// 	const reposToList: Repository[] = response.data.filter((repo: Repository) => repo.has_issues);
		// 	setRepos(reposToList);
		// });
	}, []);

	return <p>Issues</p>;
};

export { IssueList }