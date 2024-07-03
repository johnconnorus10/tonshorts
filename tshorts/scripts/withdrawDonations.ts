import { Address, toNano } from '@ton/core';
import { Donations } from '../wrappers/Donations';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Address'));
    const amount = args.length > 0 ? args[0] : await ui.input('Amount');

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const contract = provider.open(Donations.fromAddress(address));

    const numBefore = await contract.getBalance();

    await contract.send(
        provider.sender(),
        {
            value: toNano('0.005'),
        },
        {
            $$type: 'Withdraw',
            amount: toNano(amount),
        }
    );

    ui.write('Waiting for contract to increase...');

    
    let numAfter = await contract.getBalance();
    let attempt = 1;
    while (numAfter === numBefore) {
        ui.setActionPrompt(`Attempt ${attempt}`);
        await sleep(2000);
        numAfter = await contract.getBalance();
        attempt++;
    }

    ui.write('Balance: '+numAfter);

    
    ui.clearActionPrompt();
    ui.write('Contract increased successfully!');
}
