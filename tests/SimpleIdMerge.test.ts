import { idMerge} from '../index';
import * as R from 'ramda';

interface TestType {
    id: number,
    name: string,
    age: number
}

describe('idMerge', () => {
    it('should overwrite with objects later in array', () => {
        const defaults = [{id: 1, name: 'default', age: 10}]
        const overwrite = [{id: 1, name: 'new name'}]

        const processed = idMerge<TestType>(R.concat(defaults, overwrite));
        expect(processed.length).toBe(1);
        expect(processed[0].id).toBe(1);
        expect(processed[0].name).toBe('new name');
        expect(processed[0].age).toBe(10);
    }),

    it('should group objects by id', () => {
        const defaults = [{id: 1, name: 'default', age: 10}, {id: 2, name: 'second', age: 20}]
        const overwrites = [{id: 1, name: 'first', age: 10}, {id: 2, name: 'second', age: 25}]

        const processed = idMerge<TestType>(R.concat(defaults, overwrites))
        expect(processed.length).toBe(2);
        expect(processed[0].id).toBe(1);
        expect(processed[0].name).toBe('first');
        expect(processed[0].age).toBe(10);
        expect(processed[1].id).toBe(2);
        expect(processed[1].name).toBe('second');
        expect(processed[1].age).toBe(25);
    })

    it('should remove items without ids', () => {
        const defaults = [{id: 1, name: 'default', age: 10}, { name: 'no id', age: 20}]
        const overwrites = [{id: 1, name: 'first', age: 15}, {id: 2, name: 'second', age: 25}]

        const processed = idMerge<TestType>(R.concat(defaults, overwrites))
        expect(processed.length).toBe(2);
    })
})