import type { Project } from '@felixgrohs/common/src/types/Github';
import { useMemo } from 'preact/hooks';
import useFetch from '@/hooks/useFetch';


const useProjects = () => {
    const response = useFetch<Project[]>('/api/getProjects');

    const projects = useMemo<Project[] | undefined>(() => {
        return response.data && 'map' in response.data ? response.data : undefined;
    }, [response]);

    return projects;
}

export default useProjects;