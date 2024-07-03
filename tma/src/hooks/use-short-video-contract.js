import { useEffect, useState } from "react";
import { Address, fromNano, OpenedContract, toNano } from "ton-core";

import { useAsyncInitialize } from "./use-asyncInitialize";
import { useTonConnect } from "./use-tonconnect";

import { useTonClient } from "./use-tonclient";

import {TShorts} from "../wrappers/tact_TShorts.ts";
import {TShortsItem} from "../wrappers/tact_TShortsItem.ts";


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function useShortVideoContract() {
    const {client} = useTonClient()
    const {wallet, sender} = useTonConnect()

    const [numVideos, setNumVideos] = useState(0)
    const [itemAddress, setItemAddress] = useState("")

    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    const [content, setContent] = useState("")
    const [user, setUser] = useState("")

    const objContract = useAsyncInitialize(async()=>{
        if(!client || !wallet) return;
        
        const contract = TShorts.fromAddress(Address.parse("EQDGhu4K8PIQf6qy7GmE_NsyV_beW3sB8JQODWiHJuGgYM9v"));


        return client.open(contract);
    }, [client, wallet])



    const shortItemContract = useAsyncInitialize(async()=>{
        if(!objContract) return;

        const numVideos = await objContract.getNumVideos();
        setNumVideos(numVideos+"");

        console.log("Total video:"+numVideos);

        const itemAddress = await objContract.getShortAddress(numVideos);
        setItemAddress(itemAddress);

        console.log("itemAddress:"+itemAddress);


        const contract = TShortsItem.fromAddress(itemAddress);

        return client.open(contract);
    }, [objContract])

    useEffect(()=>{
        async function getContractData() {
            if(!objContract) return; // очень важная строка


            const details = await shortItemContract?.getDetails();
            console.log(details);

            let strUser = details.user.toString({bounceable: false});
            setUser(strUser);

            let content = details.content;

            // tonshorts format url
            if(/^tonshorts:\/\//.test(content)) {
                setUrl(content.replace(/^tonshorts:\/\//, 'https://466462c4806b.vps.myjino.ru/files/'));
               
                setContent(content);

            } else if(content.trim() !== "") {

                setContent(content);
            
                console.log(content);

                try {
                    let obj = JSON.parse(content.replace(/\"/g, '"'));

                    let url = obj.url;

                    // tonshorts format url
                    url = url.replaceAll(/http:\/\//gi, '');
                    url = url.replaceAll(/https:\/\//gi, '');
                    url = url.replace(/^tonshorts:\/\//, 'https://466462c4806b.vps.myjino.ru/files/');

                    setUrl(url);
                    setName(obj.name);
                } catch(e) {
                    console.warn(e);
                }
                    

            }

            setContent(details.content);

        }

        getContractData();

    }, [shortItemContract])

    return {
        numVideos: numVideos,
        url: url,
        name: name,
        user: user,
        content: content,
        newVideo: (content) => {
            console.log("new video")

            const message = {
                $$type: 'NewVideo',
                queryId: 0n,
                content
            }

            objContract?.send(sender, {
                value: toNano("0.12")
            }, message)
        },

        updateCom: async() => {

            console.log("updateCom")

            const message = {
                $$type: 'CreateComItem',
                queryId: 0n,
                amount: toNano("0.03")
            }

            objContract?.send(sender, {
                value: toNano("0.1")
            }, message);
        },

        async nextVideo(videoId) {

            const itemAddress = await objContract.getShortAddress(getRandomInt(1, numVideos));
            setItemAddress(itemAddress);
    
            console.log("itemAddress:"+itemAddress);
    
    
            const contract = TShortsItem.fromAddress(itemAddress);
    
            let shortItemContract = await client.open(contract);

            const details = await shortItemContract?.getDetails();
            console.log(details);

            let user = details.user.toString();
            setUser(user);

            console.log(user);

            let content = details.content;
            // tonshorts format url
            if(/^tonshorts:\/\//.test(content)) {
                setUrl(content.replace(/^tonshorts:\/\//, 'https://466462c4806b.vps.myjino.ru/files/'));
                       
                setContent(content);
        
            } else if(content.trim() !== "") {
        
                setContent(content);
                    
                console.log(content);
        
                try {
                    let obj = JSON.parse(content.replace(/\"/g, '"'));
        
                    let url = obj.url;
        
                    // tonshorts format url
                    url = url.replaceAll(/http:\/\//gi, '');
                    url = url.replaceAll(/https:\/\//gi, '');
                    url = url.replace(/^tonshorts:\/\//, 'https://466462c4806b.vps.myjino.ru/files/');
        
                    setUrl(url);
                    setName(obj.name);

                } catch(e) {
                    console.warn(e);
                }
                    

            }

            setContent(details.content);

        }
    }
}