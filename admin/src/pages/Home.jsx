import React, { useEffect, useMemo, useState } from 'react'
import './css/home.css'
import WidgetSm from '../conponents/WidgetSm'
import WidgetLg from '../conponents/WidgetLg'
import { userRequest } from '../../requestMethods'
import ActionsPage from '../conponents/Actions'

const Home = () => {
  const [userStats, setUserStats] = useState([]);

  const MONTHS =  useMemo(
    ()=> [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

useEffect(()=>{
  const getStats = async () =>{
    try{
const res = await userRequest.get("/users/stats");
res.data.map(item =>
  setUserStats(prev=>[
    ...prev,
    {name:MONTHS[item._id-1], "Active User": item.total},
  ])
);
    }catch{}
  };
  getStats();
}, [MONTHS]);

  return (
    <div className='home'>
      <div className='homeWidgets'>
        <WidgetSm />
        <WidgetLg />
      </div>
      <div className='homeActions'>
        <ActionsPage />
      </div>
    </div>
  )
}

export default Home
