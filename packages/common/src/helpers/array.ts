export const asyncMap = async <T, U>(arr: T[], fn: (item: T) => Promise<U>): Promise<U[]> => {
    return Promise.all(arr.map(fn));
}