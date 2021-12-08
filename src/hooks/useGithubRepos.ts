import { useState, useEffect } from 'preact/hooks';
import useFetch from './useFetch';

interface FetchRepoOptions {
    ignore?: string[];
}

const useGithubRepos = (username: string, authToken: string) => {
    const [repos, setRepos] = useState<any[]>([]);
    const response = useFetch<any[]>(`https://api.github.com/users/${username}/repos`, {
        'Content-Type': 'application/json',
        'authorization': `TOKEN ${authToken}`
    });

    useEffect(() => {
        if (!response.data) return;
        console.log(response.data);
        setRepos(response.data.filter(repo => {
            if (repo.fork || !repo.description) return false;
            return true;
        }));
    }, [response.data]);

    return repos;
}

export default useGithubRepos;