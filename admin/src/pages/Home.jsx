import React, { useEffect, useMemo, useState } from 'react'
import './css/home.css'
import WidgetSm from '../conponents/WidgetSm'
import WidgetLg from '../conponents/WidgetLg'
import Charts from '../conponents/Charts'
import { userRequest } from '../../requestMethods'
import FeaturedInfo from '../conponents/FeaturedInfo'

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
    <div>
      <FeaturedInfo />
      <Charts data={userStats} title="User Analytics" grid dataKey="Active User" />
      <div className='homeWidgets'>
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  )
}

export default Home
