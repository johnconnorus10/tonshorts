import { useState, useEffect, useCallback } from 'react';

import './balance.scss'

import { FcLike } from "react-icons/fc";

import {Link} from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

import { useTonConnect } from "../../hooks/use-tonconnect";
import { useCounterContract } from "../../hooks/use-counter-contract";

import axios from "axios";

import { colorRank } from  "../../utils/utils";

function Balance() {

  
  const {wallet} = useTonConnect();
  const { counter, add } = useCounterContract();

  const [points, setPoints] = useState(0);

  const [color, setColor]  = useState(colorRank(points));


  const fetchMyAPI = useCallback(async () => {
    const result = await axios(
      `https://asqi.ru/points.php?addr=`+wallet,
    );

    if(!isNaN(result.data)) {
        setPoints(result.data);
    } // end if
  }, [wallet]) // if userId changes, useEffect will run again

  
  useEffect(() => {
      fetchMyAPI();
  }, [fetchMyAPI])

  
useEffect(() => {
  setColor(colorRank(points));

}, [points]);

  return (<div className='balance'>

    <h2>Balances</h2>
    <br /><br />

    <div className={'points '+color}>
      Points: <span>{points}</span>
    </div>
    <div className={'time-rank '+color}>Level: {color}</div>

<br />

    <Table bordered hover variant="dark">
      <thead>
        <tr>
          <th>Level</th>
          <th>Min points</th>
          <th>Max points</th>
          <th>Speed</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="iron">iron</td>
          <td>0</td>
          <td>99</td>
          <td>x1</td>
        </tr>
        <tr>
          <td className="copper">copper</td>
          <td>100</td>
          <td>299</td>
          <td>x2</td>
        </tr>
        <tr>
          <td className="bronze">bronze</td>
          <td>300</td>
          <td>999</td>
          <td>x3</td>
        </tr>
        <tr>
          <td className="silver">silver</td>
          <td>1000</td>
          <td>9999</td>
          <td>x4</td>
        </tr>
        <tr>
          <td className="gold">gold</td>
          <td>10000</td>
          <td>&ge; 10000</td>
          <td>x5</td>
        </tr>
      </tbody>
    </Table>

    <div className='points__info'>Watch the video to the end to get maximum points
    <div>  <Link to="/shorts">Watch</Link> and <Link to="/new-short">post shorts</Link> to get points.</div>
    </div>

<br/>
<hr />
<h3>Donations</h3>

      <p>Total donations:  {counter} TON</p>

      <p>By clicking on this button donate 0.05 TON for the development of the project.</p>

      <Button variant="primary" onClick={add}>
            <FcLike /> I like this application
      </Button>


  </div>
  )
}

export default Balance