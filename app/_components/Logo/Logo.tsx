'use client'

import clsx from "clsx";
import styles from "./logo.module.css";
import {useState} from "react";
import TypeIt from "typeit-react";

export function Logo({loading, initialLoading = true, loaderOnly = false}: {loading: boolean, initialLoading?: boolean, loaderOnly?: boolean}) {
    const [firstLoading, setFirstLoading] = useState(true);

    // TypeIt do not have implemented types declarations yet
    // @ts-ignore
    function handleTypeStart(instance) {
        if (loading) {
            instance
                .type('Thinking')
                .pause(800)
                .type('.')
                .pause(800)
                .type('.')
                .pause(800)
                .type('.');
        } else {
            instance
                .type('State')
                .pause(650)
                .type(' Maestro');
        }
        return instance;
    }

    // TypeIt do not have implemented types declarations yet
    // @ts-ignore
    function handleTypeEnd(instance) {
        instance && setFirstLoading(false);

        return instance;
    }

    // Ignore default props error for TypeIt
    const error = console.error;
    console.error = (...args: any) => {
        if (/defaultProps/.test(args[0])) return;
        error(...args);
    };

    return <div className={styles.logo}>
        <span className={clsx(styles.loader, {[styles.stopped]: !loading && (!initialLoading || !firstLoading)})}></span>
        {!loaderOnly && (initialLoading && firstLoading ?
            <TypeIt options={{afterComplete: handleTypeEnd}} getBeforeInit={handleTypeStart}></TypeIt> :
            <span>{loading ? 'Thinking...' : 'State Maestro'}</span>
        )}
    </div>
}