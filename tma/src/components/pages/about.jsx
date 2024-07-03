import { useState } from 'react'



import './pages.scss'

function About() {

  return (<div className="pages">

<div className="logo">TON SHORTS</div>
<div className="logo-text">Short video service on TON</div>

<br/>

<ul>
  <li> Easy migration from web2-solutions</li>
  <ul>
    <li>Upload videos via bot</li>
    <li>Connect a wallet (e.g. Tonkeeper)</li>
    <li>Insert the link received from the bot into a web3 application</li>
  </ul>
  <li> Decentralized web3-application</li>
  <li> Gamification of the process of watching shorts.</li>

  <h2>Features</h2>
  <li> TON Network - for storing lists of videos, likes, comments</li>
  <li> Adding short videos</li>
  <li> Points for watching and adding videos. Levels for earning points and other game mechanics.</li>
  <li> Income from video likes, comments are shared between the content creator and the system (most of it stays with the content creator).  </li>

  <h2>Planned features</h2>
  <li> Recommendation system based on likes</li>
  <li> Ton Storage - for storing short videos</li>
  <li> Creation of NFT from shorts and comments</li>
  <li> Creating a utility-token (jetton) system</li>
</ul>


  </div>
  )
}

export default About