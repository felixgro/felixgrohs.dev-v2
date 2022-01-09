export const asyncMap = async <T, U>(arr: T[], fn: (item: T) => Promise<U>): Promise<U[]> => {
    const promises = arr.map(fn);
    return Promise.all(promises);
}