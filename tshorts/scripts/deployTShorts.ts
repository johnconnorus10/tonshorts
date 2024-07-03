import { toNano } from '@ton/core';
import { TShorts } from '../wrappers/TShorts';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const tShorts = provider.open(await TShorts.fromInit());

    await tShorts.send(
        provider.sender(),
        {
            value: toNano('0.9'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(tShorts.address);
}

/*

Sent transaction
Contract deployed at address EQDGhu4K8PIQf6qy7GmE_NsyV_beW3sB8JQODWiHJuGgYM9v
You can view it at https://tonscan.org/address/EQDGhu4K8PIQf6qy7GmE_NsyV_beW3sB8JQODWiHJuGgYM9v

*/
