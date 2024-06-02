import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import WebApp from '@twa-dev/sdk'

//import './App.css'

import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";


import {TonConnect} from "./components/connect/TonConnect.jsx";


// Import the necessary styles globally
import '@telegram-apps/telegram-ui/dist/styles.css';

// Import components from the library
import { AppRoot, Cell, List, Section, Card, CardChip, CardCell  } from '@telegram-apps/telegram-ui';

import React from 'react'

// Example data for rendering list cells
const cellsTexts = ['Chat Settings', 'Data and Storage', 'Devices'];

function App() {
  const [count, setCount] = useState(0)

  

  return (
    <AppRoot>

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
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>TWA + Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      {/*  */}
      <div className="card">
        <button onClick={() => WebApp.showAlert(`Hello World! Current count is ${count}`)}>
            Показать сообщение
        </button>


     </div>

        <TonConnect/>
        {/*<TonProofDemo />*/}

      </div>
    </TonConnectUIProvider>

  {/* List component to display a collection of items */}
  <List>
      {/* Section component to group items within the list */}
      <Section header="Header for the section" footer="Footer for the section">
        {/* Mapping through the cells data to render Cell components */}
        {cellsTexts.map((cellText, index) => (
          <Cell key={index}>
            {cellText}
          </Cell>
        ))}
      </Section>
    </List>

    <Card style={{ backgroundColor: '#00BFFF' }}>

  <React.Fragment key=".0">
    <img
      alt="Dog"
      src="https://i.imgur.com/892vhef.jpeg"
      style={{
        display: 'block',
        objectFit: 'cover',
        width: "100%"
      }}
    />

<video controls>
      <source src="testv.webm" type="video/webm" />
   </video>

  </React.Fragment>
</Card>



    </AppRoot>
  )
}

export default App
