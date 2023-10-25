export interface Repo {
  id: string;
  full_name: string;
  stargazers_count: number;
  language: string;
  url: string;
  created_at: string;
}

export interface SavedRepo {
  createdAt: string;
  fullName: string;
  id: string;
  language: string;
  stargazersCount: number;
  url: string;
}

export interface RepositoryDetails extends Repo {
  name: string;
  description: string;
}
