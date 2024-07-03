import {TonConnectButton, useTonWallet} from "@tonconnect/ui-react";
import './ton_connect.scss';

export const TonConnect = () => {

	const wallet = useTonWallet();

    return <header>
        <TonConnectButton />

		{wallet ? (
				<span>
					Wallet connected
				</span>
			) : (
				<span>Connect your wallet to view and download short videos.</span>
			)}
        

    </header>
}