import { exec } from 'child_process';

export const executeCommands = async (cmds: string[]): Promise<string> => {
    return new Promise((resolve, reject) => {
        const command = cmds.join(' && ');
        exec(command, (error, stdout) => {
            if (error) return reject(error);
            resolve(stdout);
        });
    });
};