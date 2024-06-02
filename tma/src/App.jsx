import { useState } from 'react'
import React from 'react'


import Home from './components/home/home.jsx'
import About from './components/pages/about.jsx'

import Shorts from './components/shorts/shorts.jsx'
import Profile from './components/profile/profile.jsx'
import UserShorts from './components/user_shorts/user_shorts.jsx'

import NewShort from './components/new_short/new_short.jsx'
import NFTShort from './components/nft_short/nft_short.jsx'


import { Routes, Route } from 'react-router-dom'

import './App.css'

function App() {

  return (<>
      <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
     
          <Route path='/shorts' element={<Shorts/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/user-shorts' element={<UserShorts/>}/>

          <Route path='/new-short' element={<NewShort/>}/>

          <Route path='/nft-short' element={<NFTShort/>}/>
          </Routes>
    </>)
}

export default App