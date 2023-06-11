import { useEffect, useState, useRef } from "react";
import { Octokit } from "@octokit/core";

import { useOctokitContext } from "../../../../hooks/useOctokitContext";
import { Repository } from "../../../../types";

const IssueList = (): JSX.Element => {
	const [repos, setRepos] = useState<Repository[]>([]);
	const octokit = useOctokitContext();
	const org = import.meta.env.VITE_GH_ORG;

	useEffect(() => {
		const issues = async () => {
			return await octokit!.request(`GET /search/issues?q=${encodeURIComponent(`test is:issue user:${org}`)}`);
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