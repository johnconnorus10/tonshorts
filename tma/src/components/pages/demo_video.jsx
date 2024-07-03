import { useState } from 'react'



import './pages.scss'

function DemoVideo() {

  return (<div className="pages">

<div width="100%" style={{maxWidth: "500px", margin: "0 auto", textAlign: "center"}}>
  <h3>Demo video ( creating short)</h3>
  <video controls width="100%" autoPlay loop>
    <source src="https://tonshorts.ru/tonshorts_ui.webm" type="video/webm" />
  </video>
</div>

  </div>
  )
}

export default DemoVideo