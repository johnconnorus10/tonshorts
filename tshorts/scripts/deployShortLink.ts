import { toNano } from '@ton/core';
import { ShortLink } from '../wrappers/ShortLink';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const shortLink = provider.open(await ShortLink.fromInit());

    await shortLink.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(shortLink.address);

    // run methods on `shortLink`
}
