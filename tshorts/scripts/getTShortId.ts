import { Address, toNano } from '@ton/core';
import { TShorts } from '../wrappers/TShorts';
import { TShortsItem } from '../wrappers/TShortsItem';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Shorts address'));
    const seqno = BigInt(args.length > 0 ? args[1] : await ui.input('Shorts seqno'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const shorts = provider.open(TShorts.fromAddress(address));

    const itemAddress = await shorts.getShortAddress(seqno);

    if (!(await provider.isContractDeployed(itemAddress))) {
        ui.write(`Error: Contract (item) at address ${address} is not deployed!`);
        return;
    }


    const shortsItem = provider.open(TShortsItem.fromAddress(itemAddress));

    const details = await shortsItem?.getDetails();

    ui.write('content:'+details.content);
    ui.write('completed:'+details.completed);



    ui.clearActionPrompt();
    ui.write('Contract increased successfully!');
}