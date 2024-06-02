import {TonConnectButton, useTonWallet} from "@tonconnect/ui-react";
import './ton_connect.scss';

export const TonConnect = () => {

	const wallet = useTonWallet();

    return <header>
        <TonConnectButton />

		{wallet ? (
				<span>
					Кошелёк подключён
				</span>
			) : (
				<span>Подключите кошелёк, чтобы просматривать и загружать короткие видео.</span>
			)}
        

    </header>
}