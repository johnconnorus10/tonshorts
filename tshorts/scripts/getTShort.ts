import { Address, toNano } from '@ton/core';
import { TShortsItem } from '../wrappers/TShortsItem';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('ShortsItem address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const shortsItem = provider.open(TShortsItem.fromAddress(address));

    const details = await shortsItem?.getDetails();

    ui.write('content:'+details.content);
    ui.write('completed:'+details.completed);



    ui.clearActionPrompt();
    ui.write('Contract increased successfully!');
}