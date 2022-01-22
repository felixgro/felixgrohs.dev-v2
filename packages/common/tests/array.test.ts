import { ArrayHelper } from '@felixgrohs/common';
describe('asyncMap', () => {
    test('maps array asynchronously', async () => {
        const arr = [1, 2, 3];
        const doubled = await ArrayHelper.asyncMap(arr, async x => x * 2);
        expect(doubled).toEqual([2, 4, 6]);
    });

    test('throws error when promise failed', () => {
        const arr = [1, 2, 3];
        expect(ArrayHelper.asyncMap(arr, async x => {
            throw new Error();
        })).rejects.toThrow();
    });
});