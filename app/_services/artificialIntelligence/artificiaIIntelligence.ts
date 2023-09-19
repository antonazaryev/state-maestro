/**
 * This service is handling communication and logic with OpenAI
 */

import OpenAI from "openai";
import {TMachine} from "@/app/_services/finiteStateMachine/fsm.types";
import {returnSchema} from "@/app/_services/artificialIntelligence/openai.return.schemas";

export type AIService = {
    getStates: (stateMachineDescription: string) => Promise<TMachine>;
};

function ArtificialIntelligenceHandler(): AIService {
    const openai = new OpenAI({
        apiKey: process.env.OPEN_AI_KEY,
    });

    return {
        /**
         * Generates finite state machine by description
         *
         * @param stateMachineDescription - The description for FSM
         * @returns The FSM logic object
         *
         */
        getStates: async function(stateMachineDescription: string): Promise<TMachine> {
            const requestContent = `Generate smart states for finite state machine that implements ${stateMachineDescription}. At least 10 states.`;
            let completion: OpenAI.Chat.ChatCompletion = await openai.chat.completions.create({
                model: "gpt-4",
                messages: [{role: "user", content: requestContent}],
                functions: [{name: "set_fsm", parameters: returnSchema}],
                function_call: {name: "set_fsm"}
            });
            const generatedText: string | undefined = completion.choices[0].message.function_call?.arguments
            // Printing a log for debugging if needed
            console.log(generatedText);
            return generatedText && JSON.parse(generatedText);
        }
    };
}

export default ArtificialIntelligenceHandler();