/* eslint-disable no-undef */
import 'regenerator-runtime/runtime'

jest.mock("ramda", () => {
    const version = process.env.RAMDA_ALIAS || "ramda";
    const module = jest.requireActual(version);
    
    return {
        __esModule: true,
        ...module
    }
})