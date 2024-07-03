import { toNano } from '@ton/core';
import { TShortsItem } from '../wrappers/TShortsItem';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const tShortsItem = provider.open(await TShortsItem.fromInit());

    await tShortsItem.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(tShortsItem.address);

    // run methods on `tShortsItem`
}
