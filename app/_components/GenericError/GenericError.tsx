'use client'

import TypeIt from "typeit-react";

export default function GenericError() {
    // TypeIt do not have implemented types declarations yet
    // @ts-ignore
    function handleTypeStart(instance) {
        instance
            .type('Ooops')
            .pause(400)
            .type(',')
            .pause(400)
            .type(' something went wrong');

        return instance;
    }

    // Ignore default props error for TypeIt
    const error = console.error;
    console.error = (...args: any) => {
        if (/defaultProps/.test(args[0])) return;
        error(...args);
    };

    return <div style={{fontSize: '2rem'}}>
        <TypeIt getBeforeInit={handleTypeStart}></TypeIt>
    </div>;
}