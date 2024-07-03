
import {TonConnect} from "../connect/TonConnect.jsx";

import { FaVideo } from "react-icons/fa";
import { FaFileVideo } from "react-icons/fa6";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { MdOndemandVideo } from "react-icons/md";

import Button from 'react-bootstrap/Button';

import { FcAbout } from "react-icons/fc";

import {useNavigate} from 'react-router-dom';

import { useTonConnect } from "../../hooks/use-tonconnect";
import { CHAIN } from "@tonconnect/ui-react";

import './home.scss'

function Home() {
  const navigate = useNavigate();


  const { network, connected } = useTonConnect();


  return (
    <div className="home">

      <div className="logo">TON SHORTS</div>
      <div className="logo-text">Short video service on TON</div>
      <div className="app">

        <TonConnect/>


        <div className="network">Network:  &nbsp;        
            {network
                ? network === CHAIN.MAINNET
                  ? "mainnet"
                  : "testnet"
                : "N/A"}

        </div>
   


        <div className='shorts-button'>
          <Button variant="primary" onClick={() => navigate('/shorts')} disabled={!connected}>
              <FaVideo />&nbsp; Watch shorts
          </Button>
        </div>

        <div className='shorts-button'>
          <Button variant="primary" onClick={() => navigate('/new-short')} disabled={!connected}>
            <FaFileVideo />&nbsp; New video
          </Button>
        </div>

        <div className='shorts-button'>
          <Button variant="primary" onClick={() => navigate('/balance')} disabled={!connected}>
            <MdOutlineAccountBalanceWallet />&nbsp; My balances
          </Button>
        </div>

        <div className='shorts-button'>
          <Button variant="info" onClick={() => navigate('/about')}>
              <FcAbout />&nbsp; About app
          </Button>
        </div>

        <div className='shorts-button'>
          <Button variant="info" onClick={() => navigate('/demo-video')}>
              <MdOndemandVideo />&nbsp; Demo video
          </Button>
        </div>

        

      </div>

    </div>
  )
}

export default Home