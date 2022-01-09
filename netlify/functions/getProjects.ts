import { Handler } from '@netlify/functions';
import { response, request } from '../utils/http';
import { asyncMap } from '../utils/array';

const { GITHUB_USER, GITHUB_TOKEN } = process.env;

const isValidRepository = (r: any) => {
    return r.description &&
        !r.private &&
        !r.fork &&
        !r.description.includes('[private]');
}

const fetchGithub = async (path: string) => {
    return await request(`https://api.github.com/${path}`, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `TOKEN ${GITHUB_TOKEN}`,
        }
    });
}

export const handler: Handler = async (event, context) => {
    // fetch & filter user's repositories
    const repos = (await fetchGithub(`users/${GITHUB_USER}/repos`))
        .data
        .filter(isValidRepository);

    // send an additional request for each repository to obtain language stats
    const projects = await asyncMap(repos, async (repo: any) => {
        const langsRaw = await fetchGithub(`repos/${repo.full_name}/languages`);
        if (langsRaw.status < 200 || langsRaw.status >= 300) {
            return null;
        };

        const langSum = Object.values<number>(langsRaw.data).reduce((a: any, b: any) => a + b, 0);
        const languages = Object.entries<number>(langsRaw.data).map(([name, val]) => ({ name, val: val / langSum }));

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