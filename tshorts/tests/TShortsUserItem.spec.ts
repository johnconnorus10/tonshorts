import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { TShortsUserItem } from '../wrappers/TShortsUserItem';
import '@ton/test-utils';

describe('TShortsUserItem', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let tShortsUserItem: SandboxContract<TShortsUserItem>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        tShortsUserItem = blockchain.openContract(await TShortsUserItem.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await tShortsUserItem.send(
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
            to: tShortsUserItem.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and tShortsUserItem are ready to use
    });
});
