import { toNano } from '@ton/core';
import { TShortsUserItem } from '../wrappers/TShortsUserItem';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const tShortsUserItem = provider.open(await TShortsUserItem.fromInit());

    await tShortsUserItem.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(tShortsUserItem.address);

    // run methods on `tShortsUserItem`
}
