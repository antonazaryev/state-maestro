import styles from './page.module.css';
import {Logo} from "@/app/_components/Logo/Logo";
import {InputForm} from "@/app/_components/InputForm/InputForm";
import {Card} from "@/app/_components/Card/Card";
import {randomizeElementsInArray} from "@/app/_utils/common.utils";
import {FiniteStateMachinesExamples} from "@/app/_data/finiteStateMachine.examples";
import Link from "next/link";

export default async function Home() {
    const fsmExamples = randomizeElementsInArray(FiniteStateMachinesExamples, 4) ;

    return (
    <main className={styles.elements}>
        <Logo loading={false}></Logo>
        <InputForm></InputForm>
        <div className={styles.suggestions}>
        {fsmExamples.map((fsm, i) =>
            <Link key={'link-'+ i} href={'/fsm?message=' + fsm.name} style={{textDecoration: 'none'}}>
                <Card appearDelay={3 + i * 0.5} text={fsm.name} description={fsm.description}></Card>
            </Link>
        )}
        </div>
    </main>
  )
}
