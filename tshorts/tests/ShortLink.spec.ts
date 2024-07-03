import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { ShortLink } from '../wrappers/ShortLink';
import '@ton/test-utils';

describe('ShortLink', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let shortLink: SandboxContract<ShortLink>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        shortLink = blockchain.openContract(await ShortLink.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await shortLink.send(
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
            to: shortLink.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and shortLink are ready to use
    });
});
