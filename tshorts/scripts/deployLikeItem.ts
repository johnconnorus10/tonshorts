import { toNano } from '@ton/core';
import { LikeItem } from '../wrappers/LikeItem';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const likeItem = provider.open(await LikeItem.fromInit());

    await likeItem.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(likeItem.address);

    // run methods on `likeItem`
}
