import { Address, toNano } from '@ton/core';
import { TShorts } from '../wrappers/TShorts';
import { TShortsItem } from '../wrappers/TShortsItem';
import { TShortsUser } from '../wrappers/TShortsUser';
import { TShortsUserItem } from '../wrappers/TShortsUserItem';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Shorts address'));
    const userAddr = Address.parse(args.length > 0 ? args[1] : await ui.input('Shorts user address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const shorts = provider.open(TShorts.fromAddress(address));


    const itemAddress = await shorts.getUserShortAddress(userAddr);

    if (!(await provider.isContractDeployed(itemAddress))) {
        ui.write(`Error: Contract (item) at address ${address} is not deployed!`);
        return;
    }


        const shortsUser = provider.open(TShortsUser.fromAddress(itemAddress));
    
        ui.write("shortsUser "+shortsUser);
    
        const counter = await shortsUser?.getCounter();
       
            
        ui.write('user counter:'+counter);

        const userItemAddr = await shortsUser.getItemAddress(BigInt(8));

        ui.write('userItemAddr:'+userItemAddr.toString());

        const shortsUserItem = provider.open(TShortsUserItem.fromAddress(userItemAddr));

        const videoId = await shortsUserItem.getVideoId()
        ui.write('ID:'+8);
        ui.write('VideoId:'+videoId);


        /*
        for(let i=1; i <= counter; i++) {

            const userItemAddr = await shortsUser.getItemAddress(BigInt(i));

            const shortsUserItem = provider.open(TShortsUserItem.fromAddress(userItemAddr));

            const videoId = await shortsUserItem.getVideoId()
            ui.write('ID:'+i);
            ui.write('VideoId:'+videoId);

        }
            */
    



        /*
        const userItemAddress = await shortsUser?.getItemAddress(counter);
        const details = await shortsUser.getDetails();

        console.log("==details:");
        console.log(details);
        */
   
      

    ui.clearActionPrompt();
    ui.write('Contract increased successfully!');
}