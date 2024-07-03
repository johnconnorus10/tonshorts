import { Address, toNano } from '@ton/core';
import { Likes } from '../wrappers/Likes';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider, args: string[]) {
    const ui = provider.ui();

    const address = Address.parse(args.length > 0 ? args[0] : await ui.input('Likes address'));
    const videoId =args.length > 0 ? args[0] : await ui.input('Video ID');
    const creator = Address.parse(args.length > 0 ? args[0] : await ui.input('Short creator address'));

    if (!(await provider.isContractDeployed(address))) {
        ui.write(`Error: Contract at address ${address} is not deployed!`);
        return;
    }

    const likes = provider.open(Likes.fromAddress(address));

    const counterBefore = await likes.getAllLikes();

    await likes.send(
        provider.sender(),
        {
            value: toNano('0.15'),
        },
        {
            $$type: 'NewShortLink',
            videoId: BigInt(videoId),
            creator: creator
        }
    );

    ui.write('Waiting for counter to increase...');

    let counterAfter = await likes.getAllLikes();
    let attempt = 1;
    while (counterAfter === counterBefore) {
        ui.setActionPrompt(`Attempt ${attempt}`);
        await sleep(2000);
        counterAfter = await likes.getAllLikes();
        attempt++;
    }

    ui.write('numAfter:'+counterAfter);
    const itemAddress = await likes.getShortLinkAddress(counterAfter);

    ui.write('itemAddress:'+itemAddress);

    const likeItemAddress = await likes.getLikeItemAddress(BigInt(videoId), creator);

    ui.write('likeItemAddress:'+likeItemAddress);

    ui.clearActionPrompt();
    ui.write('Contract increased successfully!');
}
