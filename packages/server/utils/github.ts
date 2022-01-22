import { request } from './http';

// Sends a get request to github's api on given path
const fetchGithub = async <T>(path: string) => {
    const token = process.env.GITHUB_TOKEN;
    if (!token) throw new Error('GITHUB_TOKEN not set as env variable');

    return await request<T>('get', `https://api.github.com/${path}`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `TOKEN ${token}`,
        }
    });
}

// Checks if a repository is allowed to be displayed on the website
const isValidRepository = (r: Repository) => {
    return r.description &&
        !r.private &&
        !r.fork &&
        !r.description.includes('[private]');
}

// Get & filter repositories for specific github user
export const getRepositories = async (): Promise<Repository[]> => {
    const user = process.env.GITHUB_USER;
    if (!user) throw new Error('GITHUB_USER not set as env variable');

    const repos = (await fetchGithub<Repository[]>(`users/${user}/repos`))
        .data
        .filter(isValidRepository);

    return repos;
}

// Get relative language stats for a repository
// f.e.: { "JavaScript": 0.5, "TypeScript": 0.3, "CSS": 0.2 }
export const getLanguageStats = async (repo: Repository): Promise<RepositoryLanguageStats[]> => {
    const res = await fetchGithub<RepositoryLanguages>(`repos/${repo.full_name}/languages`);
    const sum = Object.values<number>(res.data).reduce((a: any, b: any) => a + b, 0);
    return Object.entries<number>(res.data).map<RepositoryLanguageStats>(([name, val]) => ({ name, val: val / sum }))
}

export interface Repository {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    homepage: string;
    owner: RepositoryOwner;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    mirror_url: string | null;
    archived: boolean;
    disabled: boolean;
    license: RepositoryLicense;
    allow_forking: boolean;
    is_template: boolean;
    topics: string[];
    visibility: 'public' | 'private';
    forks: number;
    forks_count: number;
    open_issues: number;
    open_issues_count: number;
    watchers: number;
    default_branch: string;
    permissions: RepositoryPermissions;
}

export interface RepositoryOwner {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
}

export interface RepositoryLicense {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
}

export interface RepositoryPermissions {
    admin: boolean;
    maintain: boolean;
    push: boolean;
    triage: boolean;
    pull: boolean;
}

export type RepositoryLanguages = { [key: string]: number };

export type RepositoryLanguageStats = { name: string, val: number };