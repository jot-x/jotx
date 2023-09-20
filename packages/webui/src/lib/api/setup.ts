import FS, { PromisifiedFS } from '@isomorphic-git/lightning-fs';
import { FileSystemDocStore } from '@jotx/fs';

export const _FILESYSTEMS: Record<string, PromisifiedFS> = {};

export function getFS(repo: string): PromisifiedFS {
	if (_FILESYSTEMS[repo]) {
		return _FILESYSTEMS[repo];
	}
	const fs = new FS('jotx_' + repo).promises;
	_FILESYSTEMS[repo] = fs;
	return fs;
}

export function getDocStore(repo: string): FileSystemDocStore {
	return new FileSystemDocStore(getFS(repo));
}

export function getDocStoreByFS(fs: PromisifiedFS): FileSystemDocStore {
	return new FileSystemDocStore(fs);
}
