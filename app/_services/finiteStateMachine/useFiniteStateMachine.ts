import {TMachine, TState} from "@/app/_services/finiteStateMachine/fms.types";
import {useState} from "react";

export type TUseFiniteStateMachineReturn = [
    state: TState,
    transition: (action: string) => void,
];

/**
 * This hook implements finite state machine
 *
 * @param machine - The object describes the FMS logic
 * @returns The array with current running state and function to execute transition
 *
 */
export default function useFiniteStateMachine(machine: TMachine): TUseFiniteStateMachineReturn {
    if (!machine.states?.length) {
        throw new Error('Do not contains any states');
    }

    const initialState = machine.states.find(s => s.name === machine.initialState) || machine.states[0];
    const [currentState, setCurrentState] = useState<TState>(initialState);

    const handleAction = (action: string) => {
        const transition = currentState.transitions.find(t => t.input === action);
        if (!transition) {
            throw new Error(`Action '${action}' do not exists in state '${currentState.name}'`);
        }

        const nextState = machine.states.find(s => s.name === transition.nextState);
        if (!nextState) {
            throw new Error(`Action '${action}' contains illegal state transition to '${transition.nextState}'`);
        }

        setCurrentState(nextState);
    };

    return [currentState, handleAction];
}