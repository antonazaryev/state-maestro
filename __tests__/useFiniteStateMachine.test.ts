import {it, expect, describe, jest} from "@jest/globals";
import {act, renderHook, waitFor} from "@testing-library/react";
import useFiniteStateMachine from "../app/_services/finiteStateMachine/useFiniteStateMachine";
import {TMachine} from "@/app/_services/finiteStateMachine/fms.types";

describe("Test FMS logic", () => {
    const emptyFMS: TMachine = {
        name: 'Test FMS',
        initialState: 'state1',
        states: []
    }
    const goodFMS: TMachine = {
        ...emptyFMS,
        states: [
            {
                name: 'state1',
                transitions: [
                    {
                        input: 'state1-transition1',
                        nextState: 'state2',
                    },
                    {
                        input: 'state1-transition2',
                        nextState: 'state3',
                    }
                ]
            },
            {
                name: 'state2',
                transitions: [
                    {
                        input: 'state2-transition1',
                        nextState: 'state1',
                    }
                ]
            },
            {
                name: 'state3',
                transitions: []
            }
        ]
    };

    it("should error in no states", async () => {
        expect(() => {
            renderHook(() => useFiniteStateMachine(emptyFMS));
        }).toThrow('Do not contains any states');
    });

    it("should start with initial state", async () => {
        const {result} = renderHook(() => useFiniteStateMachine(goodFMS));
        const [currentState] = result.current;

        expect(currentState).toBe(goodFMS.states[0]);
    });

    it("should move to correct state on action", async () => {
        const {result} = renderHook(() => useFiniteStateMachine(goodFMS));
        const [_currentState, handleAction] = result.current;

        act(() => handleAction('state1-transition1'));

        await waitFor(() =>
            expect(result.current[0]).toEqual(goodFMS.states[1])
        );
    });

    it("should error on wrong action", async () => {
        const {result} = renderHook(() => useFiniteStateMachine(goodFMS));
        const [_currentState, handleAction] = result.current;

        expect(() => {
            act(() => handleAction('wrongAction'));
        }).toThrow("Action 'wrongAction' do not exists in state 'state1'");
    });
});