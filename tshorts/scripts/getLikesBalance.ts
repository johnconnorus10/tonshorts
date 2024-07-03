import { Address, fromNano } from '@ton/core';
import { Likes } from '../wrappers/Likes';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Likes address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const contract = provider.open(Likes.fromAddress(address));

    

    const balance = await contract.getBalance();

    ui.write('contract balance:'+fromNano(balance));



    ui.clearActionPrompt();
    ui.write('Contract increased successfully!');
}