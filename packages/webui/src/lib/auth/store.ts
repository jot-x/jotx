import type { User } from '$lib/models/user';
import { persisted } from 'svelte-local-storage-store';

export const userStore = persisted<User>('user', {} as User);
