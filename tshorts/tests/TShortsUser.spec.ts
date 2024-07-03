import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { TShortsUser } from '../wrappers/TShortsUser';
import '@ton/test-utils';

describe('TShortsUser', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let tShortsUser: SandboxContract<TShortsUser>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        tShortsUser = blockchain.openContract(await TShortsUser.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await tShortsUser.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: tShortsUser.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and tShortsUser are ready to use
    });
});
