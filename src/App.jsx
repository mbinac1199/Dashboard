import "./App.css";
import Box from "./components/Box";
import Graphs from "./components/Graphs";
import CurrentTrades from "./components/CurrentTrades";
import { useEffect, useState } from "react";
import {
  getAccountInfo,
  getBestTimeFrame,
  getTrades,
  lastDayProfit,
  lastHourProfit,
  lastMonthProfit,
  lastWeekProfit,
  lastYearProfit,
} from "./services/BackendService";

function App() {
  const fiveTabs = ["Hour", "Day", "Week", "Month", "YTD"];
  const defaultData = {
    hour: 0,
    day: 0,
    week: 0,
    month: 0,
    ytd: 0,
  };
  const [profits, setProfits] = useState(defaultData);
  const [win, setWin] = useState(defaultData);
  const [loss, setLoss] = useState(defaultData);
  const [points, setPoints] = useState(defaultData);
  const [total, setTotal] = useState(defaultData);
  useEffect(() => {
    const updateState = async () => {
      try {
        const {
          profit: hourProfit,
          winPercentage: hourWin,
          lossPercentage: hourLoss,
          points: hourPoints,
          total: hourTotal,
        } = await lastHourProfit();
        const {
          profit: dayProfit,
          winPercentage: dayWin,
          lossPercentage: dayLoss,
          points: dayPoints,
          total: dayTotal,
        } = await lastDayProfit();
        const {
          profit: weekProfit,
          winPercentage: weekWin,
          lossPercentage: weekLoss,
          points: weekPoints,
          total: weekTotal,
        } = await lastWeekProfit();
        const {
          profit: monthProfit,
          winPercentage: monthWin,
          lossPercentage: monthLoss,
          points: monthPoints,
          total: monthTotal,
        } = await lastMonthProfit();
        const {
          profit: yearProfit,
          winPercentage: yearWin,
          lossPercentage: yearLoss,
          points: yearPoints,
          total: yearTotal,
        } = await lastYearProfit();
        const prof = {
          hour: hourProfit,
          day: dayProfit,
          week: weekProfit,
          month: monthProfit,
          ytd: yearProfit,
        };
        setProfits((prevProfits) => prof);
        const w = {
          hour: hourWin,
          day: dayWin,
          week: weekWin,
          month: monthWin,
          ytd: yearWin,
        };
        setWin((prevWin) => w);
        const l = {
          hour: hourLoss,
          day: dayLoss,
          week: weekLoss,
          month: monthLoss,
          ytd: yearLoss,
        };
        setLoss((prevLoss) => l);
        const p = {
          hour: hourPoints,
          day: dayPoints,
          week: weekPoints,
          month: monthPoints,
          ytd: yearPoints,
        };
        setPoints((prevPoints) => p);
        const t = {
          hour: hourTotal,
          day: dayTotal,
          week: weekTotal,
          month: monthTotal,
          ytd: yearTotal,
        };
        setTotal((prevTotal) => t);
        setGraphData((prevGraph) => ({
          labels: fiveTabs.map((data) => data),
          datasets: [
            {
              label: "Profit",
              data: fiveTabs.map((key) => prof[key.toLowerCase()]),
              backgroundColor: [
                "rgb(233 129 72)",
                "rgb(233 122 62)",
                "rgb(235 112 46)",
                "rgb(233 106 37)",
                "rgb(234 104 40)",
              ],
            },
            {
              label: "No of Trades",
              data: fiveTabs.map((key) => t[key.toLowerCase()]),
              backgroundColor: [
                "rgb(89 138 243)",
                "rgb(71 125 241)",
                "rgb(59 117 243)",
                "rgb(49 110 240)",
                "rgb(37 99 235)",
              ],
            },
          ],
        }));
      } catch (error) {
        console.error("Error:", error);
      }
    };
    updateState();
  }, []);

  const [account, setAccount] = useState({
    name: "",
    balance: 0,
  });
  useEffect(() => {
    const updateAccount = async () => {
      const acc = await getAccountInfo();
      setAccount(acc);
      document.title = acc.name + "'s Dashboard";
    };
    updateAccount();
  }, []);

  const [bestTimeFrame, setBestTimeFrame] = useState({
    month1: "",
    month2: "",
  });
  useEffect(() => {
    const getTime = async () => {
      const bestTime = await getBestTimeFrame();
      setBestTimeFrame(bestTime);
    };
    getTime();
  }, []);

  const [graphData, setGraphData] = useState({
    labels: fiveTabs.map((data) => data),
    datasets: [
      {
        label: "Points Earned",
        data: fiveTabs.map((key) => points[key.toLowerCase()]),
        backgroundColor: [
          "rgb(233 129 72)",
          "rgb(233 122 62)",
          "rgb(235 112 46)",
          "rgb(233 106 37)",
          "rgb(234 104 40)",
        ],
      },
    ],
  });

  return (
    <div className="bg-gray-50">
      <div className="w-11/12 mx-auto py-6">
        <h1 className="font-bold text-5xl mb-7">Dashboard</h1>
        {/* First Row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Box
            title={"Profit"}
            data={profits}
            tabs={fiveTabs}
            currency={true}
          />
          <Box title={"Win %"} data={win} tabs={fiveTabs} percentage={true} />
          <Box title={"Loss %"} data={loss} tabs={fiveTabs} percentage={true} />
          <Box
            title={"No of Trades"}
            data={total}
            tabs={fiveTabs}
            noDecimal={true}
          />
        </div>
        <CurrentTrades balance={account.balance} />
        {/* Last Row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-white p-4 rounded-lg w-full h-full ">
            <h2 className="font-semibold text-orange-400 text-lg">
              Account Balance
            </h2>
            <p className="text-5xl font-bold text-gray-700 mt-3">
              ${account?.balance.toFixed(1)}
            </p>
          </div>
          <Box title={"Points"} data={points} tabs={fiveTabs} />
          <div className="bg-white p-4 rounded-lg w-full h-full ">
            <h2 className="font-semibold text-orange-400 text-lg">
              Account Name
            </h2>
            <p className="text-3xl font-bold text-gray-700 mt-3">
              {account?.name}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg w-full h-full ">
            <h2 className="font-semibold text-orange-400 text-lg">
              Best Timeframe
            </h2>
            <p className="text-3xl font-bold text-gray-700 mt-3">
              {bestTimeFrame?.month1}-{bestTimeFrame?.month2}
            </p>
          </div>
        </div>
        <Graphs title={"Graphs"} data={graphData} />
      </div>
    </div>
  );
}

export default App;
