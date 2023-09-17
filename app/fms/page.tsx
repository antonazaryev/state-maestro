import {FMSRunner} from "@/app/_components/FMSRunner/FMSRunner";
import ArtificialIntelligence from "@/app/_services/artificialIntelligence/artificiaIIntelligence";
import {TMachine} from "@/app/_services/finiteStateMachine/fms.types";
import GenericError from "@/app/_components/GenericError/GenericError";
import prisma from "@/app/_services/database/prismaConnection";
import {Logo} from "@/app/_components/Logo/Logo";
import Link from "next/link";
import styles from "./page.module.css"

async function getFMSExample(fmsName: string): Promise<TMachine> {
    'use server'
    const readyFMSExample = await prisma.fMSExamples.findFirst({
        where: { name: { equals: fmsName } },
    });

    if (readyFMSExample) {
        return JSON.parse(readyFMSExample.data) as TMachine;
    }

    const machine: TMachine = await ArtificialIntelligence.getStates(fmsName);
    await prisma.fMSExamples.create({ data: {name: fmsName, data: JSON.stringify(machine)}});

    return machine;
}

export default async function Home({ searchParams }: { searchParams: { message: string }}) {
    if (searchParams.message) {
        try {
            const machine: TMachine = await getFMSExample(searchParams.message);
            if (machine) {
                return (
                    <main>
                        <Link className={styles.logo} href={'/'}>
                            <Logo loading={false} initialLoading={false}></Logo>
                        </Link>
                        <FMSRunner data={machine}/>
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
