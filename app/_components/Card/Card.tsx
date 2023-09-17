'use client'

import styles from './card.module.css';
import SubmitIcon from '@/public/submit.svg';
import clsx from "clsx";

export type TSuggestion = {
    text: string,
    description?: string,
    onClick?: (text: string) => void,
    appearDelay?: number
}
export function Card({text, description, onClick, appearDelay = 0}: TSuggestion) {
    return <>
        <button
            className={clsx({[styles.animate]: appearDelay}, styles.button)}
            style={{animationDelay: appearDelay + 's'}}
            onClick={() => onClick && onClick(text)}
        >
            <div className={styles.textContainer}>
                <span className={styles.title}>{text}</span>
                {description && <span className={styles.description}>{description}</span>}
            </div>
            <div className={styles.icon}>
                <SubmitIcon width={16} height={16}/>
            </div>
        </button>
    </>
}