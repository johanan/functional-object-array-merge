import {compose, map, mergeAll, groupWith, eqProps, sortBy, prop, filter, has}  from 'ramda';

//@ts-ignore
export const objectArrayMerge : <A extends any,>(propKey: keyof(A)) => (list: Partial<A>[]) => Partial<A>[] = (propKey) => compose(
    map(mergeAll),
    //@ts-ignore
    groupWith(eqProps(propKey)),
    //@ts-ignore
    sortBy(prop(propKey)),
    //@ts-ignore
    filter(has(propKey))
);

export const idMerge : <A extends Required<Pick<A, "id">>>(list: Partial<A>[]) => Partial<A>[] = objectArrayMerge('id');