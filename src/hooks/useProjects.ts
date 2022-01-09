import type { Project } from '@/components/async/ProjectTicker/ProjectItem';
import { useMemo } from 'preact/hooks';
import useServerlessRequest from '@/hooks/useServerlessRequest';

const useProjects = () => {
    const response = useServerlessRequest<Project[]>('getProjects');

    const projects = useMemo<Project[] | undefined>(() => {
        return response.data;
    }, [response]);

    return projects;
}

export default useProjects;