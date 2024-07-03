import { useEffect, useState } from "react";
import { Address, fromNano, OpenedContract, toNano } from "ton-core";

import {TShorts} from "../wrappers/tact_TShorts.ts";
import {TShortsUser} from "../wrappers/tact_TShortsUser.ts";


import { useAsyncInitialize } from "./use-asyncInitialize.js";
import { useTonConnect } from "./use-tonconnect.js";

import { useTonClient } from "./use-tonclient.js";


export function useUserShortsContract(user) {
    const {client} = useTonClient()
    const {wallet} = useTonConnect()
    const [details, setDetails] = useState()

    const [counter, setCounter] = useState(0);

    const objContract = useAsyncInitialize(async()=>{
        if(!client || !wallet) return;

        const contract = TShorts.fromAddress(Address.parse("EQDGhu4K8PIQf6qy7GmE_NsyV_beW3sB8JQODWiHJuGgYM9v"));

        return client.open(contract)
    }, [client, wallet])


    useEffect(()=>{
        async function getCurrentCount() {
            if(!objContract) return; // очень важная строка

            console.log("user addr "+user);


            const userCounterAddress = await objContract.getUserShortAddress(Address.parse(user));

            console.log("userCounterAddress "+userCounterAddress);
    
            /*
            const shortsUser = TShortsUser.fromAddress(Address.parse(userCounterAddress));
    
            console.log("shortsUser "+shortsUser);
    
            const counter = await shortsUser?.getCounter();
    
            setCounter(counter);
            
            console.log('user counter:'+counter);
            */

/*
            const userItemAddress = await shortsUser?.getItemAddress(counter);
            const details = await userItemAddress.getDetails();

            console.log("==details:");
            console.log(details);
   
            setDetails(details);*/
        }

        getCurrentCount();

    }, [objContract])

    return {
        details,
        counter

    }
}