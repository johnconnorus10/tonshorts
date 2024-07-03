import { Address, toNano } from '@ton/core';
import { LikeItem } from '../wrappers/LikeItem';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Like item address'));
    //const videoId = BigInt(args.length > 0 ? args[1] : await ui.input('Vodeo ID'));
 //   const sender = Address.parse(args.length > 0 ? args[2] : await ui.input('Sender address'));


    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const likeItem = provider.open(LikeItem.fromAddress(address));

   // const likeItem = provider.open(LikeItem.fromInit(address, videoId, sender));

    /*
    if (!(await provider.isContractDeployed(likeItem))) {
        ui.write(`Error: Contract (item) at address ${address} is not deployed!`);
        return;
    }
        */

    const counter = await likeItem?.getCounter();
    const dt = await likeItem?.getDt();

    ui.write('video like item counter:'+counter);
    ui.write('video like item dt:'+dt);



    ui.clearActionPrompt();
    ui.write('Contract increased successfully!');
}