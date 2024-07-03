import { toNano } from '@ton/core';
import { Likes } from '../wrappers/Likes';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const likes = provider.open(await Likes.fromInit());

    await likes.send(
        provider.sender(),
        {
            value: toNano('0.8'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(likes.address);

    await sleep(5000);

    console.log('ShortLinkAddress: ', await likes.getShortLinkAddress(1n));
}


/*

Sent transaction
Contract deployed at address EQAxLQ6Ze77aHmwgMPxGvLr6IWu8e78l-cAhUXDKTla38nEi
You can view it at https://tonscan.org/address/EQAxLQ6Ze77aHmwgMPxGvLr6IWu8e78l-cAhUXDKTla38nEi
ShortLinkAddress:  EQDMbovxAAcOvIq7_C6j5PKuhx6FqXXiPg82jGhPhvmXtPsq

*/