'use client'

import styles from './input.form.module.css';
import SubmitIcon from '@/public/submit.svg';
import {ChangeEvent, useState} from "react";
import {preventDefault} from "@/app/_utils/common.utils";
import {useRouter} from "next/navigation";

export function InputForm() {
    const [message, setMessage] = useState('');
    const router = useRouter();
    const handleSubmit = preventDefault(() => {
        router.push('/fsm?message=' + message);
    });
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    return <form className={styles.container} onSubmit={handleSubmit}>
        <input type='text' className={styles.input} placeholder='Type FSM description' value={message} onChange={handleChange}></input>
        <button className={styles.button} disabled={message === ''}>
            <SubmitIcon width={16} height={16}/>
        </button>
    </form>
}