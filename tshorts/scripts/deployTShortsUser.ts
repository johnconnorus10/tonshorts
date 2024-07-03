import { toNano } from '@ton/core';
import { TShortsUser } from '../wrappers/TShortsUser';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const tShortsUser = provider.open(await TShortsUser.fromInit());

    await tShortsUser.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(tShortsUser.address);

    // run methods on `tShortsUser`
}
