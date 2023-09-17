import {BaseSyntheticEvent} from "react";

/**
 * Wraps function that receives an event to stop propagation
 *
 * @param f - The function that will be wrapped
 *
 */

export const preventDefault = (f: (e: BaseSyntheticEvent) => void) => (e: BaseSyntheticEvent) => {
    e.preventDefault();
    f(e);
}

/**
 * Randomizes elements from given array
 *
 * @param array - The source array
 * @param count - The count of elements need to be returned
 * @returns The array with length of count
 *
 */
export const randomizeElementsInArray = <T>(array: T[], count: number) => {
    if (array?.length < count) {
        throw new Error('Array size is smaller than provided count');
    }
    const result: T[] = [];
    const guardian = new Set();
    while (result.length < count) {
        const index = Math.floor(count * Math.random());
        if (guardian.has(index)) {
            continue;
        }
        const element = array[index];
        guardian.add(index);
        result.push(element);
    }
    return result;
};
