import {it, expect, describe} from "@jest/globals";
import {act, renderHook, waitFor} from "@testing-library/react";
import useFiniteStateMachine from "../app/_services/finiteStateMachine/useFiniteStateMachine";
import {TMachine} from "@/app/_services/finiteStateMachine/fsm.types";

describe("Test FSM logic", () => {
    const emptyFSM: TMachine = {
        name: 'Test FSM',
        initialState: 'state1',
        states: []
    }
    const goodFSM: TMachine = {
        ...emptyFSM,
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
            renderHook(() => useFiniteStateMachine(emptyFSM));
        }).toThrow('Do not contains any states');
    });

    it("should start with initial state", async () => {
        const {result} = renderHook(() => useFiniteStateMachine(goodFSM));
        const [currentState] = result.current;

        expect(currentState).toBe(goodFSM.states[0]);
    });

    it("should move to correct state on action", async () => {
        const {result} = renderHook(() => useFiniteStateMachine(goodFSM));
        const [_currentState, handleAction] = result.current;

        act(() => handleAction('state1-transition1'));

        await waitFor(() =>
            expect(result.current[0]).toEqual(goodFSM.states[1])
        );
    });

    it("should error on wrong action", async () => {
        const {result} = renderHook(() => useFiniteStateMachine(goodFSM));
        const [_currentState, handleAction] = result.current;

        expect(() => {
            act(() => handleAction('wrongAction'));
        }).toThrow("Action 'wrongAction' do not exists in state 'state1'");
    });
});