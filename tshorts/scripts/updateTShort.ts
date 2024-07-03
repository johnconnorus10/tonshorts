import { Address, toNano } from '@ton/core';
import { TShorts } from '../wrappers/TShorts';
import { TShortsItem } from '../wrappers/TShortsItem';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Shorts address'));
    const seqno = BigInt(args.length > 0 ? args[1] : await ui.input('Shorts seqno'));
    const content = args.length > 0 ? args[1] : await ui.input('Shorts content');

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const shorts = provider.open(TShorts.fromAddress(address));

    const numBefore = await shorts.getNumVideos();

    await shorts.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'UpdateVideo',
            content,
            seqno
        }
    );

    ui.write('Waiting for contract to increase...');

    
    const itemAddress = await shorts.getShortAddress(seqno);


    ui.write('itemAddress:'+itemAddress);

    //---------------------

    if (!(await provider.isContractDeployed(itemAddress))) {
        ui.write(`Error: Contract at address ${itemAddress} is not deployed!`);
        return;
    }


    await sleep(10000);

    const shortsItem = provider.open(TShortsItem.fromAddress(itemAddress));

    const details = await shortsItem?.getDetails();

    ui.write('update content:'+details.content);

    //---------------------



    ui.clearActionPrompt();
    ui.write('Contract increased successfully!');
}