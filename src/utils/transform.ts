import { Repo, SavedRepo } from '../types/types';

export const transformRepoData = (selectedRepo: Repo | null): SavedRepo => {
  return {
    id: selectedRepo?.id.toString() || '',
    fullName: selectedRepo?.full_name || '',
    stargazersCount: selectedRepo?.stargazers_count || 0,
    language: selectedRepo?.language || '',
    url: selectedRepo?.url || '',
    createdAt: selectedRepo?.created_at || '',
  };
};
