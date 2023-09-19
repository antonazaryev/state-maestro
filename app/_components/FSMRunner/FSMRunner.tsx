'use client'
import styles from './fsm.runner.module.css';
import {Card} from "@/app/_components/Card/Card";
import {TMachine} from "@/app/_services/finiteStateMachine/fsm.types";
import useFiniteStateMachine from "@/app/_services/finiteStateMachine/useFiniteStateMachine";

export type TFSMRunnerParams = {data: TMachine};

export function FSMRunner({data}: TFSMRunnerParams) {
    const [state, action] = useFiniteStateMachine(data);

    const handleClick = (actionName: string) => {
        action(actionName);
    };

    return <div className={styles.container}>
        <div className={styles.stateContainer}>
            <div className={styles.state}>{state.name}</div>
            <div className={styles.description}>{state.description}</div>
        </div>
        <div className={styles.actions}>
            {state.transitions?.map((t, i) =>
                <Card key={t.input} appearDelay={0.5 + i * 0.5} text={t.input} description={t.description} onClick={handleClick}></Card>
            )}
        </div>
    </div>;
}