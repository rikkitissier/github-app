export interface CreateIssuePayload = {
	repo: string;
	body: string;
	includeMessage: boolean;
}

export interface Repository {
	id: number;
	full_name: string;
	has_issues: boolean;
}

export interface DropListItem {
	id: string;
	value: string;
}