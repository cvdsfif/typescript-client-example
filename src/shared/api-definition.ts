import { ApiImplementation, InferTargetFromSchema, apiS, arrayS, bigintS, objectS, stringS } from "typizator";

const simpleRecordS = objectS({
    id: bigintS.notNull,
    name: stringS.notNull
}).notNull;
export type SimpleRecord = InferTargetFromSchema<typeof simpleRecordS>;

export const simpleApiS = apiS({
    meow: { args: [], retVal: stringS.notNull },
    noMeow: { args: [] },
    helloWorld: { args: [stringS.notNull, bigintS.notNull], retVal: stringS.notNull },
    cruel: {
        world: { args: [stringS.notNull], retVal: stringS.notNull }
    },
    increment: { args: [simpleRecordS], retVal: simpleRecordS },
    doubleArray: { args: [arrayS(stringS.notNull).notNull], retVal: arrayS(stringS.notNull).notNull },
    errorGenerator: { args: [stringS.notNull, stringS, stringS.optional] }
});
export type SimpleApi = ApiImplementation<typeof apiS>;