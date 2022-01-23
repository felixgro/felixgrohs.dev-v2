import type { Handler } from '@netlify/functions';
import type { Project } from '@felixgrohs/common/src/types/Github';
import { ArrayHelper } from '@felixgrohs/common';
import { getRepositories, getLanguageStats } from '../utils/github';
import { response } from '../utils/http';

// Get, filter and convert github repositories from specific user
export const handler: Handler = async (evt, ctx) => {
    if (evt.httpMethod !== 'GET') return response(405);

    const repositories = await getRepositories();

    const projects: Project[] = await ArrayHelper.asyncMap(repositories, async (repo) => {
        return {
            name: repo.name,
            id: repo.id,
            description: repo.description,
            stars: repo.stargazers_count,
            url: repo.html_url,
            clone: repo.clone_url,
            homepage: repo.homepage,
            size: repo.size,
            languages: await getLanguageStats(repo),
        };
    });

    return response(200, projects);
}