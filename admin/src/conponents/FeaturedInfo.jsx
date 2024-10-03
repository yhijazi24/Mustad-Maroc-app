import React, { useEffect, useState } from 'react';
import './css/featuredInfo.css';
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { userRequest } from '../../requestMethods';

const FeaturedInfo = () => {

  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [sales, setSales] = useState(0);  // Add state for sales
  const [cost, setCost] = useState(0);    // Add state for cost

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("order/income");
        setIncome(res.data);
        setPerc((res.data[1].total * 100) / res.data[0].total - 100);

        // Assuming er 'sales' and 'cost' data come in the same response
        setSales(res.data[1]?.sales);    // Add sales data
        setCost(res.data[1]?.cost);      // Add cost data

      } catch (error) {
        console.error("Error fetching income data", error);
      }
    };
    getIncome();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${sales || "N/A"}</span> {/* Display sales */}
          <span className="featuredMoneyRate">
            {/* Adjust the percentage change logic for sales if needed */}
            {sales < 0 ? (
              <ArrowDownward className="featuredIcon negative" />
            ) : (
              <ArrowUpward className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  )
}

export default FeaturedInfo;
