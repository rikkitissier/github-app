import { useEffect, useState, useRef } from "react";
import { Octokit } from "@octokit/core";

import { useOctokitContext } from "../../../../hooks/useOctokitContext";

interface Repository {
	id: number;
	full_name: string;
	has_issues: boolean;
}

const IssueList = (): JSX.Element => {
	const [repos, setRepos] = useState<Repository[]>([]);
	const octokit = useOctokitContext();

	useEffect(() => {
		const issues = async () => {
			return await octokit!.current.request(`GET /search/issues?q=${encodeURIComponent("test is:issue user:rikkitissier")}`);
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