import { toNano } from '@ton/core';
import { Comments } from '../wrappers/Comments';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const comments = provider.open(await Comments.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await comments.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(comments.address);

    console.log('ID', await comments.getId());
}
