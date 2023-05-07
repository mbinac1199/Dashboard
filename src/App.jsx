import "./App.css";
import Box from "./components/Box";
import Graphs from "./components/Graphs";
import CurrentTrades from "./components/CurrentTrades";
import axios from 'axios'
import { useEffect, useState } from "react";


const lastYearProfit= async(config)=>{
  const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    const isoLastYear = lastYear.toISOString();
    const now = new Date();
    const isoDateTime = now.toISOString();
    console.log(isoDateTime, isoLastYear);
    // the starting and last year will be replace this this last year value is for testing purpose
    await axios.get(`https://mt-client-api-v1.new-york.agiliumtrade.ai/users/current/accounts/8fea2c8b-0e4a-4d17-a1fe-58d3d07585f2/history-orders/time/${isoLastYear}/${isoDateTime}`, config)
      .then((res) => {
        // Calculate profit/loss for each order
        res.data.forEach(order => {
          if (order.type === 'ORDER_TYPE_BUY') {
            order.profit = (order.closePrice - order.openPrice) * order.volume;
          } else if (order.type === 'ORDER_TYPE_SELL') {
            order.profit = (order.openPrice - order.closePrice) * order.volume;
          }
        });
        // Calculate total profit/loss for all orders
        const totalProfit = res.data.reduce((acc, order) => acc + (order.profit || 0), 0);
        //console.log('Last year Total profit:', totalProfit);
        return totalProfit
      })
}
const lastMonthProfit= async(config)=>{
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
    const isoLastMonth = lastMonth.toISOString();
    const now = new Date();
    const isoDateTime = now.toISOString();
    console.log(isoDateTime, isoLastMonth);
    // the starting and last year will be replace this this last year value is for testing purpose
    await axios.get(`https://mt-client-api-v1.new-york.agiliumtrade.ai/users/current/accounts/8fea2c8b-0e4a-4d17-a1fe-58d3d07585f2/history-orders/time/${lastMonth}/${isoDateTime}`, config)
      .then((res) => {
        // Calculate profit/loss for each order
        res.data.forEach(order => {
          if (order.type === 'ORDER_TYPE_BUY') {
            order.profit = (order.closePrice - order.openPrice) * order.volume;
          } else if (order.type === 'ORDER_TYPE_SELL') {
            order.profit = (order.openPrice - order.closePrice) * order.volume;
          }
        });
        // Calculate total profit/loss for all orders
        const totalProfit = res.data.reduce((acc, order) => acc + (order.profit || 0), 0);
        // console.log('Last Month Total profit:', totalProfit);
        return totalProfit
      })
}

const lastHourProfit = async (config) => {
  const lastHour = new Date();
  lastHour.setHours(lastHour.getHours() - 1);
  const isoLastHour = lastHour.toISOString();
  const now = new Date();
  const isoDateTime = now.toISOString();
  console.log(isoDateTime, isoLastHour);
  await axios
    .get(`https://mt-client-api-v1.new-york.agiliumtrade.ai/users/current/accounts/8fea2c8b-0e4a-4d17-a1fe-58d3d07585f2/history-orders/time/${isoLastHour}/${isoDateTime}`, config)
    .then((res) => {
      // Calculate profit/loss for each order
      res.data.forEach((order) => {
        if (order.type === "ORDER_TYPE_BUY") {
          order.profit = (order.closePrice - order.openPrice) * order.volume;
        } else if (order.type === "ORDER_TYPE_SELL") {
          order.profit = (order.openPrice - order.closePrice) * order.volume;
        }
      });
      // Calculate total profit/loss for all orders
      const totalProfit = res.data.reduce((acc, order) => acc + (order.profit || 0), 0);
      // console.log('Last Hour Total profit:', totalProfit);
      return totalProfit;
    });
};
const lastWeekProfit = async (config) => {
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const isoLastWeek = lastWeek.toISOString();
  const now = new Date();
  const isoDateTime = now.toISOString();
  console.log(isoDateTime, isoLastWeek);
  const response = await axios.get(`https://mt-client-api-v1.new-york.agiliumtrade.ai/users/current/accounts/8fea2c8b-0e4a-4d17-a1fe-58d3d07585f2/history-orders/time/${isoLastWeek}/${isoDateTime}`, config);
  const orders = response.data;
  // Calculate profit/loss for each order
  orders.forEach(order => {
    if (order.type === 'ORDER_TYPE_BUY') {
      order.profit = (order.closePrice - order.openPrice) * order.volume;
    } else if (order.type === 'ORDER_TYPE_SELL') {
      order.profit = (order.openPrice - order.closePrice) * order.volume;
    }
  });
  // Calculate total profit/loss for all orders
  const totalProfit = orders.reduce((acc, order) => acc + (order.profit || 0), 0);
  console.log('Last week total profit:', totalProfit);
  return totalProfit;
}
const lastDayProfit = async (config) => {
  const lastDay = new Date();
  lastDay.setDate(lastDay.getDate() - 1);
  const isoLastDay = lastDay.toISOString();
  const now = new Date();
  const isoDateTime = now.toISOString();
  console.log(isoDateTime, isoLastDay);

  try {
    const response = await axios.get(`https://mt-client-api-v1.new-york.agiliumtrade.ai/users/current/accounts/8fea2c8b-0e4a-4d17-a1fe-58d3d07585f2/history-orders/time/${isoDateTime}/${isoLastDay}`, config);
    // Calculate profit/loss for each order
    response.data.forEach(order => {
      if (order.type === 'ORDER_TYPE_BUY') {
        order.profit = (order.closePrice - order.openPrice) * order.volume;
      } else if (order.type === 'ORDER_TYPE_SELL') {
        order.profit = (order.openPrice - order.closePrice) * order.volume;
      }
    });
    // Calculate total profit/loss for all orders
    const totalProfit = response.data.reduce((acc, order) => acc + (order.profit || 0), 0);
    console.log('Last day total profit:', totalProfit);
    return totalProfit;
  } catch (error) {
    console.log(error);
  }
};
const getTrades= async (config)=>{
  axios.get("https://metastats-api-v1.new-york.agiliumtrade.ai/users/current/accounts/8fea2c8b-0e4a-4d17-a1fe-58d3d07585f2/open-trades",config)
  .then((res)=>{
    console.log(res.data)
    return res.data
  })
}

function App() {
  

  let token = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIwNDc3MzIwZWJhZTk5YjhhNjMyYzZjNzdlMjc3ZTZlMSIsInBlcm1pc3Npb25zIjpbXSwiYWNjZXNzUnVsZXMiOlt7Im1ldGhvZHMiOlsidHJhZGluZy1hY2NvdW50LW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJtZXRob2RzIjpbIm1ldGFhcGktYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJtZXRob2RzIjpbIm1ldGFhcGktYXBpOndzOnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsibWV0aG9kcyI6WyJtZXRhYXBpLWFwaTp3czpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfSx7Im1ldGhvZHMiOlsibWV0YXN0YXRzLWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsibWV0aG9kcyI6WyJyaXNrLW1hbmFnZW1lbnQtYXBpOnJlc3Q6cHVibGljOio6KiJdLCJyb2xlcyI6WyJyZWFkZXIiLCJ3cml0ZXIiXSwicmVzb3VyY2VzIjpbIio6JFVTRVJfSUQkOioiXX0seyJtZXRob2RzIjpbImNvcHlmYWN0b3J5LWFwaTpyZXN0OnB1YmxpYzoqOioiXSwicm9sZXMiOlsicmVhZGVyIiwid3JpdGVyIl0sInJlc291cmNlcyI6WyIqOiRVU0VSX0lEJDoqIl19LHsibWV0aG9kcyI6WyJtdC1tYW5hZ2VyLWFwaTpyZXN0OmRlYWxpbmc6KjoqIiwibXQtbWFuYWdlci1hcGk6cmVzdDpwdWJsaWM6KjoqIl0sInJvbGVzIjpbInJlYWRlciIsIndyaXRlciJdLCJyZXNvdXJjZXMiOlsiKjokVVNFUl9JRCQ6KiJdfV0sInRva2VuSWQiOiIyMDIxMDIxMyIsImltcGVyc29uYXRlZCI6ZmFsc2UsInJlYWxVc2VySWQiOiIwNDc3MzIwZWJhZTk5YjhhNjMyYzZjNzdlMjc3ZTZlMSIsImlhdCI6MTY4MzM2Mjg5OH0.Msl6xAxDgo_-NycDtxjPxiS-aONYGzTmjh8DnrcbKGcNfoFFrYHU42OlQfDbAU2DBAxnew9nblRP1z7FMx_N49d-6hfj4J74ivb1uWK2xpB7_jr5MYnre5V74t7rxzrihrX6PQSdXCexA3D5UKPDAWJYVtGFitHbsC7pUqx5U8nwpgQ6hGEYt_soTPxCUv2DMeVg9G97kipBfKx8z2sQc0DUi0rvTJYkYtaDvq2RFOUiPIUrr7YwpW2IPob9sdnKRIZYvJa6oxMPSrYNap9HM1GIHu8wrQyr7-C-umOqkJYbty4iaZGgusGufVu3oy_-aRUPFdMuvnSN4PdPa5OhsDvaV9-dxwlBWdf9m178--fMvotdbhrTifWVG184oVlaDlI7pDtAuU5VyEg6rmoaKQrL73MiNOM2uj9aORPJPI2XX579jtk9YctuQXRltGrBbPH0ZK1PLY-snaEoAyjbhyGOIb6HpUfCMWGIZeFS53qWQONhDlYDo5s8PiSyytxSklKg5XBDAuur_WuzRNCFCmEpFdoBGAW_mR-3OkrIAWrKC1MfUmvwAqC62VddsqMMfLLBgR_Tswdss7z0xFyaYj3Ef1o3c4kAEXO1H8VkzkuAvO_yt61ZsrUA_1Mv43Op6jZoQ2bJUvMbovPe-aY2AyRCVu_1aNmg4EkYqboqnm0"
  useEffect(() => {
    const config = {
      headers: {
        "auth-token": token
      }
    }
    lastYearProfit(config);
  lastMonthProfit(config);
  lastHourProfit(config);
  lastWeekProfit(config);
  lastDayProfit(config);
  getTrades(config)

  },[]);
 

  const fiveTabs = ["Hour", "Day", "Week", "Month", "YTD"];
  // This includes names of accounts
  const accounts = [
    "a1",
    "a2",
    "a3",
    "a4",
    "a5",
    "a6",
    "a7",
    "a8",
    "a9",
    "a10",
  ];
  const trades = [
    {
      type: "Buy",//type
      profit: -40,//currentVolume
      account: "abc",//client id
      order: "abc",// id
      entryPrice: 150,//open price
      sl: 1,//stopLoss
      tp: 1,//take profit
      currentPrice: 100,// currentPrice
      advisor: "Tim",//brokerComment
      estimatedProfit: 30,//volume
      runningTime: 2,//time
    },
    {
      type: "Sell",
      profit: 40,
      account: "abc",
      order: "abc",
      entryPrice: 150,
      sl: 1,
      tp: 1,
      currentPrice: 100,
      advisor: "Tim",
      estimatedProfit: 30,
      runningTime: 2,
    },
  ];

  return (
    <div className="bg-gray-50">
      <div className="w-11/12 mx-auto py-6">
        <h1 className="font-bold text-5xl mb-7">Dashboard</h1>
        {/* First Row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-3">


          <Box
            title={"Profit"}
            data={{ hour: 25, day: 50, week: 80, month: 100, ytd: 100 }}
            tabs={fiveTabs}
          />


          <Box
            title={"PTS"}
            data={{ hour: 25, day: 50, week: 80, month: 100, ytd: 150 }}
            tabs={fiveTabs}
          />
          <Box
            title={"Win %"}
            data={{ hour: 25, day: 50, week: 80, month: 100, ytd: 150 }}
            tabs={fiveTabs}
          />
          <Box
            title={"Loss %"}
            data={{ hour: 25, day: 50, week: 80, month: 100, ytd: 150 }}
            tabs={fiveTabs}
          />
          <Box
            title={"Balance"}
            data={{
              a1: 10,
              a2: 20,
              a3: 30,
              a4: 40,
              a5: 50,
              a6: 60,
              a7: 70,
              a8: 80,
              a9: 90,
              a10: 100,
            }}
            tabs={accounts}
          />
          <Box
            title={"All Accounts Trades"}
            data={{ hour: 25, day: 50, week: 80, month: 100, ytd: 150 }}
            tabs={fiveTabs}
          />
        </div>
        <CurrentTrades trades={trades} />
        {/* Last Row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <Box
            title={"Account Balance"}
            data={{ hour: 25, day: 50, week: 80, month: 100, ytd: 150 }}
            tabs={fiveTabs}
          />
          <Box
            title={"Points"}
            data={{ hour: 25, day: 50, week: 80, month: 100, ytd: 150 }}
            tabs={fiveTabs}
          />
          <Box
            title={"Best Account"}
            data={{ hour: "a", day: "b", week: "c", month: "d", ytd: "e" }}
            tabs={fiveTabs}
          />
          <div className="bg-white p-4 rounded-lg w-full h-full ">
            <h2 className="font-semibold text-orange-400 text-lg">
              Best Timeframe
            </h2>
            <p className="text-3xl font-bold text-gray-700 mt-3">March-April</p>
          </div>
        </div>
        <Graphs
          title={"Graphs"}
          data={{ hour: "a", day: "b", week: "c", month: "d", ytd: "e" }}
          tabs={fiveTabs}
        />
      </div>
    </div>
  );
}

export default App;
