import { toNano } from '@ton/core';
import { Donations } from '../wrappers/Donations';
import { NetworkProvider, sleep } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const donations = provider.open(await Donations.fromInit(BigInt(Math.floor(Math.random() * 10000))));

    await donations.send(
        provider.sender(),
        {
            value: toNano('0.8'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(donations.address);

    await sleep(5000);

    console.log('Balance: ', await donations.getBalance());
}


/*

NEW 28.06

Sent transaction
Contract deployed at address EQBd205wqXBiRjHfiY32M0LbJCBAajI8O530lNtj45EyYZCX
You can view it at https://tonscan.org/address/EQBd205wqXBiRjHfiY32M0LbJCBAajI8O530lNtj45EyYZCX
Balance:  0

*/