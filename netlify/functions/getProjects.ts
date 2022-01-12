import { Handler } from '@netlify/functions';
import { fetchGithub, isValidRepository, Repository, RepositoryLanguages } from '../libs/github';
import { response } from '../libs/http';
import { asyncMap } from '../helpers/array';

export const handler: Handler = async (event, context) => {
    const { GITHUB_USER } = process.env;

    // fetch & filter user's repositories
    const repositories = (await fetchGithub<Repository[]>(`users/${GITHUB_USER}/repos`))
        .data
        .filter(isValidRepository);

    // send an additional request for each repository to obtain language stats
    const projects = await asyncMap(repositories, async (repo) => {
        const languagesRaw = await fetchGithub<RepositoryLanguages>(`repos/${repo.full_name}/languages`);
        const languagesTotal = Object.values<number>(languagesRaw.data).reduce((a: any, b: any) => a + b, 0);
        const languages = Object.entries<number>(languagesRaw.data).map(([name, val]) => ({ name, val: val / languagesTotal }));

        return {
            name: repo.name,
            id: repo.id,
            description: repo.description,
            stars: repo.stargazers_count,
            url: repo.html_url,
            clone: repo.clone_url,
            homepage: repo.homepage,
            languages
        }
    });

    return response(200, projects);
}