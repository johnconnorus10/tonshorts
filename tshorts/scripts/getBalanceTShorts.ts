import { Address, fromNano } from '@ton/core';
import { TShorts } from '../wrappers/TShorts';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Shorts address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const shorts = provider.open(TShorts.fromAddress(address));

    

    const balance = await shorts.getBalance();

    ui.write('contract balance:'+fromNano(balance));



    ui.clearActionPrompt();
    ui.write('Contract increased successfully!');
}