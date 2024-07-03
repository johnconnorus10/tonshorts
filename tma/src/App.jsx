import { useState } from 'react'
import React from 'react'


import Home from './components/home/home.jsx'

import About from './components/pages/about.jsx'
import DemoVideo from './components/pages/demo_video.jsx'

import Shorts from './components/shorts/shorts.jsx'
import Profile from './components/profile/profile.jsx'
import UserShorts from './components/user_shorts/user_shorts.jsx'

import NewShort from './components/new_short/new_short.jsx'
import NFTShort from './components/nft_short/nft_short.jsx'

import Comments from './components/comments/comments.jsx'
import Publish from './components/publish/publish.jsx'
import Complaint from './components/complaint/complaint.jsx'

import Balance from './components/balance/balance.jsx'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import {THEME, TonConnectUIProvider} from "@tonconnect/ui-react";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Layout from './components/layout/Layout.jsx';


function App() {

   // let manifestUrl = "https://tonshorts.ru/tonconnect-manifest.json";
   let manifestUrl = "https://ton-connect.github.io/demo-dapp-with-wallet/tonconnect-manifest.json";

  return (<TonConnectUIProvider manifestUrl={manifestUrl}  uiPreferences={{theme: THEME.DARK}}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home/>}/>


                    <Route path='/about' element={<About/>}/>
                    <Route path='/demo-video' element={<DemoVideo/>}/>
                
                    <Route path='/shorts' element={<Shorts/>}/>
                    <Route path='/profile/:id' element={<Profile/>}/>
                    <Route path='/user-shorts' element={<UserShorts/>}/>
                    <Route path='/comments' element={<Comments/>}/>

                    <Route path='/new-short' element={<NewShort/>}/>

                    <Route path='/nft-short' element={<NFTShort/>}/>
                    <Route path='/publish' element={<Publish/>}/>
                    <Route path='/complaint' element={<Complaint/>}/>

                    <Route path='/balance' element={<Balance/>}/>
                </Route>
            
            </Routes>
    </TonConnectUIProvider>)
}

export default App