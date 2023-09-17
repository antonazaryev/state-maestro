/**
 * This JSON schema is defined to restrict OpenAI for specific JSON return
 */

export const returnSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            description: 'FMS name'
        },
        description: {
            type: 'string',
            description: 'FMS description'
        },
        initialState: {
            type: 'string',
            description: 'Initial state name'
        },
        finalState: {
            type: 'string',
            description: 'Final state name'
        },
        states: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                    },
                    description: {
                        type: 'string',
                        description: 'State description'
                    },
                    transitions: {
                        type: "array",
                        description: 'List of available transitions',
                        items: {
                            type: 'object',
                            properties: {
                                input: {
                                    type: 'string',
                                    description: 'Action description'
                                },
                                nextState: {
                                    type: 'string',
                                    description: 'Next state name'
                                },
                                description: {
                                    type: 'string',
                                    description: 'Action description'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};