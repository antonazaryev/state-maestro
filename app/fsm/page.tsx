import {FSMRunner} from "@/app/_components/FSMRunner/FSMRunner";
import ArtificialIntelligence from "@/app/_services/artificialIntelligence/artificiaIIntelligence";
import {TMachine} from "@/app/_services/finiteStateMachine/fsm.types";
import GenericError from "@/app/_components/GenericError/GenericError";
import prisma from "@/app/_services/database/prismaConnection";
import {Logo} from "@/app/_components/Logo/Logo";
import Link from "next/link";
import styles from "./page.module.css"

async function getFSMExample(fsmName: string): Promise<TMachine> {
    'use server'
    const readyFSMExample = await prisma.fMSExamples.findFirst({
        where: { name: { equals: fsmName } },
    });

    if (readyFSMExample) {
        return JSON.parse(readyFSMExample.data) as TMachine;
    }

    const machine: TMachine = await ArtificialIntelligence.getStates(fsmName);
    await prisma.fMSExamples.create({ data: {name: fsmName, data: JSON.stringify(machine)}});

    return machine;
}

export default async function Home({ searchParams }: { searchParams: { message: string }}) {
    if (searchParams.message) {
        try {
            const machine: TMachine = await getFSMExample(searchParams.message);
            if (machine) {
                return (
                    <main>
                        <Link className={styles.logo} href={'/'}>
                            <Logo loading={false} initialLoading={false}></Logo>
                        </Link>
                        <FSMRunner data={machine}/>
                    </main>
                );
            }
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <main>
            <GenericError></GenericError>
        </main>
    );
}
