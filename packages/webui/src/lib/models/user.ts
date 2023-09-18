import type { GitPlatformType } from './git-platform';

export interface User {
	id: string;
	notebooks: UserNotebook[];
}

export interface UserNotebook {
	name: string;
	title?: string;
	git_remote: UserGitPlatform;
}

export interface UserGitPlatform {
	type: GitPlatformType;
	owner: string;
	repo: string;
	token?: string;
	prefs?: {
		[key: string]: string | number | boolean;
	};
}
