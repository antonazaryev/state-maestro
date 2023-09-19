export type TMachine = {
    name: string,
    description?: string,
    initialState: string,
    finalState?: string,
    states: TState[]
}

export type TState = {
    name: string,
    description?: string,
    transitions: TStateTransition[]
}

export type TStateTransition = {
    input: string,
    nextState: string,
    description?: string
}