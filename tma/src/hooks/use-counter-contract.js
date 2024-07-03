import { useEffect, useState } from "react";
import { Address, fromNano, OpenedContract, toNano } from "ton-core";

import {Donations} from "../wrappers/tact_Donations.ts";


import { useAsyncInitialize } from "./use-asyncInitialize";
import { useTonConnect } from "./use-tonconnect";

import { useTonClient } from "./use-tonclient";

const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time))

export function useCounterContract() {
    const {client} = useTonClient()
    const {wallet, sender} = useTonConnect()
    const [counter, setCounter] = useState(0)

    const objContract = useAsyncInitialize(async()=>{
        if(!client || !wallet) return;

        const contract = Donations.fromAddress(Address.parse("EQBd205wqXBiRjHfiY32M0LbJCBAajI8O530lNtj45EyYZCX"))

        return client.open(contract);
    }, [client, wallet])


    useEffect(()=>{
        async function getCurrentCount() {
            if(!objContract) return; // очень важная строка

            const count = await objContract.getBalance();

            setCounter(count);

            // sleep 2000 ms
            await sleep(2000);

            getCurrentCount();

        }

        getCurrentCount();

    }, [objContract])

    return {
        counter: counter,
        add: async() => {
            console.log("Donations")

            await objContract?.send(sender, {
                value: toNano("0.05")
            }, "Donation")


            let numAfter = await contract.getBalance();
            let attempt = 1;
            while (numAfter === numBefore) {
                ui.setActionPrompt(`Attempt ${attempt}`);
                await sleep(2000);
                numAfter = await contract.getBalance();
                attempt++;

                setCounter(numAfter)
            }

        }
    }
}