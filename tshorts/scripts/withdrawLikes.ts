import { Address, toNano } from '@ton/core';
import { Likes } from '../wrappers/Likes';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Likes address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const shorts = provider.open(Likes.fromAddress(address));

    const beforebalance = await shorts.getBalance();
    ui.write('Before Balance: '+beforebalance);

    const amount = args.length > 0 ? args[1] : await ui.input('Likes amount');    

    await shorts.send(
        provider.sender(),
        {
            value: toNano('0.1'),
        },
        {
            $$type: 'Withdraw',
            amount: toNano(amount),
        }
    );

    ui.write('Waiting for contract to increase...');


    //---------------------
    await sleep(10000);


    const balance = await shorts.getBalance();

    ui.write('Balance: '+balance);


    ui.clearActionPrompt();
    ui.write('Contract increased successfully!');
}