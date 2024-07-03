import { Address, toNano } from '@ton/core';
import { Likes } from '../wrappers/Likes';
import { ShortLink } from '../wrappers/ShortLink';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Likes address'));
    const videoId = BigInt(args.length > 0 ? args[1] : await ui.input('Vodeo ID'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const likes = provider.open(Likes.fromAddress(address));

    const itemAddress = await likes.getShortLinkAddress(BigInt(videoId));

    if (!(await provider.isContractDeployed(itemAddress))) {
        ui.write(`Error: Contract (item) at address ${address} is not deployed!`);
        return;
    }


    const item = provider.open(ShortLink.fromAddress(itemAddress));

    const counter = await item?.getCounter();

    ui.write('video like counter:'+counter);
    ui.write('video id:'+videoId);



    ui.clearActionPrompt();
    ui.write('Contract increased successfully!');
}