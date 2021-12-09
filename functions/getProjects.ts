import { Handler } from '@netlify/functions';

const axios = require('axios');

const sendGithubRequest = async (url: string) => {
    const response = await axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            'authorization': `TOKEN ${process.env.GITHUB_TOKEN}`,
        }
    });

    return response;
}

export const handler: Handler = async (event, context) => {
    const reposResponse = await sendGithubRequest(`https://api.github.com/users/${process.env.GITHUB_USER}/repos`);

    const reposPromises = reposResponse.data.filter(r => {
        return !r.private && !r.fork && r.description;
    }).map(async r => {
        const langResponse = await sendGithubRequest(`https://api.github.com/repos/${r.full_name}/languages`);
        if (langResponse.status < 200 || langResponse >= 300) return langResponse;
        const langSum = Object.values<number>(langResponse.data).reduce((a: any, b: any) => a + b, 0);
        const languages = Object.entries<number>(langResponse.data).map(([name, val]) => ({ name, val: val / langSum }));

        return {
            name: r.name,
            description: r.description,
            stars: r.stargazers_count,
            url: r.html_url,
            clone: r.clone_url,
            homepage: r.homepage,
            languages
        }
    });

    const repos = await Promise.all(reposPromises);

    return {
        statusCode: reposResponse.status,
        body: JSON.stringify(repos),
    };
}