import { useState } from 'react'
import React from 'react'


import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";
import {TonConnect} from "../../components/connect/TonConnect.jsx";

import { FaVideo } from "react-icons/fa";
import { FaFileVideo } from "react-icons/fa6";


//import SiteMap from "../../components/blocks/sitemap.jsx"

import { Link } from 'react-router-dom'

import './home.scss'

function Home() {
  //const wallet = useTonWallet();

  return (
    <>

      <div className="logo">TON SHORTS</div>
      <div className="logo-text">Сервис коротких видео на TON</div>

        <TonConnectUIProvider
      manifestUrl="https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json"
      uiPreferences={{theme: THEME.DARK}}
      walletsListConfiguration={{
        includeWallets: [
          {
            appName: "safepalwallet",
            name: "SafePal",
            imageUrl: "https://s.pvcliping.com/web/public_image/SafePal_x288.png",
            aboutUrl: "https://www.safepal.com/download",
            jsBridgeKey: "safepalwallet",
            platforms: ["ios", "android", "chrome", "firefox"]
          },
          {
            appName: "tonwallet",
            name: "TON Wallet",
            imageUrl: "https://wallet.ton.org/assets/ui/qr-logo.png",
            aboutUrl: "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd",
            universalLink: "https://wallet.ton.org/ton-connect",
            jsBridgeKey: "tonwallet",
            bridgeUrl: "https://bridge.tonapi.io/bridge",
            platforms: ["chrome", "android"]
          }
        ]
      }}
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/tc_twa_demo_bot/start'
      }}
    >
      <div className="app">


        <TonConnect/>

        <div className='shorts-button'>
            <Link to='/shorts'>
                <button type="button" className='button'>
                   <FaVideo /> &nbsp;
                   Смотреть видео
                </button>
            </Link>
        </div>

        <div className='shorts-button'>
            <Link to='/new-short'>
                <button type="button" className='button'>
                   <FaFileVideo /> &nbsp;
                   Добавить видео
                </button>
            </Link>
        </div>



      </div>
    </TonConnectUIProvider>

    </>
  )
}

export default Home