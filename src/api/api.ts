import { Repo, RepositoryDetails, SavedRepo } from "../types/types";

console.log(process.env.GITHUB_TOKEN);


const githubToken = process.env.GITHUB_TOKEN;
const apiUrl = 'http://localhost:8080/repo/';

export const fetchSavedRepositories = async (): Promise<SavedRepo[]> => {
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.repos as SavedRepo[];
    } else {
      throw new Error(`Failed to fetch repositories. Status: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`An error occurred while fetching repositories: ${error}`);
  }
};

export const deleteRepository = async (repoId: string): Promise<void> => {
  try {
    const response = await fetch(`${apiUrl}${repoId}`, {
      method: 'DELETE',
    });

    if (response.status === 204 || response.status === 200) {
      return;
    } else if (response.status === 404) {
      throw new Error('Repository not found.');
    } else {
      throw new Error(`Unexpected response: ${response.status}`);
    }
  } catch (error) {
    throw new Error(`Error deleting repository: ${error}`);
  }
};

export async function fetchGitHubRepositories(searchText: string): Promise<RepositoryDetails[]> {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${searchText}&per_page=10`,
    {
      method: 'GET',
      headers: {
        Authorization: `token ${githubToken}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error('Error fetching GitHub repositories');
  }
  const data = await response.json();
  return data.items;
}

export async function saveRepositoryToServer(repositoryData: SavedRepo): Promise<void> {
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch saved repositories');
  }

  const data = await response.json();
  const savedRepos = data.repos;

  if (savedRepos.length >= 10) {
    throw new Error('Maximum number of saved repositories reached');
  }

  const alreadySavedRepo = savedRepos.some((repo: Repo) => repo.id === repositoryData.id);

  if (alreadySavedRepo) {
    throw new Error('Repo already saved');
  }

  const saveResponse = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(repositoryData),
  });

  if (!saveResponse.ok) {
    throw new Error('Failed to save repository to the server');
  }
}
