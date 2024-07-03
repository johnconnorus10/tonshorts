import { Address, toNano } from '@ton/core';
import { TShorts } from '../wrappers/TShorts';
import { TShortsItem } from '../wrappers/TShortsItem';
import { TShortsUser } from '../wrappers/TShortsUser';
import { TShortsUserItem } from '../wrappers/TShortsUserItem';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Shorts address'));
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
            value: toNano('0.12'),
        },
        {
            $$type: 'NewVideo',
            content
        }
    );

    ui.write('Waiting for contract to increase...');

    
    let numAfter = await shorts.getNumVideos();
    let attempt = 1;
    while (numAfter === numBefore) {
        ui.setActionPrompt(`Attempt ${attempt}`);
        await sleep(2000);
        numAfter = await shorts.getNumVideos();
        attempt++;
    }

    ui.write('numAfter:'+numAfter);
    const itemAddress = await shorts.getShortAddress(numAfter);


    ui.write('itemAddress:'+itemAddress);

    //---------------------

    if (!(await provider.isContractDeployed(itemAddress))) {
        ui.write(`Error: Contract at address ${itemAddress} is not deployed!`);
        return;
    }

    const shortsItem = provider.open(TShortsItem.fromAddress(itemAddress));

    const details = await shortsItem?.getDetails();

    ui.write('new content:'+details.content);

    if (!(await provider.isContractDeployed(itemAddress))) {
        ui.write(`Error: Contract at address ${itemAddress} is not deployed!`);
        return;
    }

    //---------------------
    //---------------------
    const userCounterAddress = await shorts.getUserShortAddress(details.user);
    
    const shortsUser = provider.open(TShortsUser.fromAddress(userCounterAddress));
    
    const counter = await shortsUser?.getCounter();

    const userItemAddress = await shortsUser?.getItemAddress(counter);
    
    ui.write('user counter:'+counter);
    //---------------------
    //---------------------
    
    const shortsUserItem = provider.open(TShortsUserItem.fromAddress(userItemAddress));
    
    const userItemDetails = await shortsUserItem?.getDetails();
    
    ui.write('user item videoId:'+userItemDetails.videoId);
    ui.write('user item dt:'+userItemDetails.dt);
    //---------------------



    ui.clearActionPrompt();
    ui.write('Contract increased successfully!');
}

