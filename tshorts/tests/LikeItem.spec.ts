import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { LikeItem } from '../wrappers/LikeItem';
import '@ton/test-utils';

describe('LikeItem', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let likeItem: SandboxContract<LikeItem>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        likeItem = blockchain.openContract(await LikeItem.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await likeItem.send(
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
            to: likeItem.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and likeItem are ready to use
    });
});
