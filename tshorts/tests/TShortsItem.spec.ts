import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { TShortsItem } from '../wrappers/TShortsItem';
import '@ton/test-utils';

describe('TShortsItem', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let tShortsItem: SandboxContract<TShortsItem>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        tShortsItem = blockchain.openContract(await TShortsItem.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await tShortsItem.send(
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
            to: tShortsItem.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and tShortsItem are ready to use
    });
});
