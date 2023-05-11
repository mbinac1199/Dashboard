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
  const defaultData = {
    hour: 0,
    day: 0,
    week: 0,
    month: 0,
    ytd: 0,
  };
  const [trades, setTrades] = useState([]);
  const [profits, setProfits] = useState(defaultData);
  const [win, setWin] = useState(defaultData);
  const [loss, setLoss] = useState(defaultData);
  const [points, setPoints] = useState(defaultData);

  useEffect(() => {
    const updateState = async () => {
      try {
        const {
          profit: hourProfit,
          winPercentage: hourWin,
          lossPercentage: hourLoss,
          points: hourPoints,
        } = await lastHourProfit();
        const {
          profit: dayProfit,
          winPercentage: dayWin,
          lossPercentage: dayLoss,
          points: dayPoints,
        } = await lastDayProfit();
        const {
          profit: weekProfit,
          winPercentage: weekWin,
          lossPercentage: weekLoss,
          points: weekPoints,
        } = await lastWeekProfit();
        const {
          profit: monthProfit,
          winPercentage: monthWin,
          lossPercentage: monthLoss,
          points: monthPoints,
        } = await lastMonthProfit();
        const {
          profit: yearProfit,
          winPercentage: yearWin,
          lossPercentage: yearLoss,
          points: yearPoints,
        } = await lastYearProfit();

        setProfits((prevProfits) => ({
          hour: hourProfit,
          day: dayProfit,
          week: weekProfit,
          month: monthProfit,
          ytd: yearProfit,
        }));
        setWin((prevWin) => ({
          hour: hourWin,
          day: dayWin,
          week: weekWin,
          month: monthWin,
          ytd: yearWin,
        }));
        setLoss((prevLoss) => ({
          hour: hourLoss,
          day: dayLoss,
          week: weekLoss,
          month: monthLoss,
          ytd: yearLoss,
        }));
        const p = {
          hour: hourPoints,
          day: dayPoints,
          week: weekPoints,
          month: monthPoints,
          ytd: yearPoints,
        };
        setPoints((prevPoints) => p);
        setGraphData((prevGraph) => ({
          labels: fiveTabs.map((data) => data),
          datasets: [
            {
              label: "Points Earned",
              data: fiveTabs.map((key) => p[key.toLowerCase()]),
              backgroundColor: [
                "rgb(233 129 72)",
                "rgb(233 122 62)",
                "rgb(235 112 46)",
                "rgb(233 106 37)",
                "rgb(234 104 40)",
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
    const updateBalance = async () => {
      const acc = await getAccountInfo();
      setAccount(acc);
    };
    updateBalance();
  }, []);

  useEffect(() => {
    const getCurrent = async () => {
      const trades = await getTrades();
      setTrades(trades);
    };
    getCurrent();
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

  const fiveTabs = ["Hour", "Day", "Week", "Month", "YTD"];

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <Box
            title={"Profit"}
            data={profits}
            tabs={fiveTabs}
            currency={true}
          />
          {/* <Box
            title={"PTS"}
            data={{ hour: 25, day: 50, week: 80, month: 100, ytd: 150 }}
            tabs={fiveTabs}
          /> */}
          <Box title={"Win %"} data={win} tabs={fiveTabs} percentage={true} />
          <Box title={"Loss %"} data={loss} tabs={fiveTabs} percentage={true} />
          {/* <Box
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
            currency={true}
          />
          <Box
            title={"All Accounts Trades"}
            data={{ hour: 25, day: 50, week: 80, month: 100, ytd: 150 }}
            tabs={fiveTabs}
            currency={true}
          /> */}
        </div>
        {trades ? (
          <CurrentTrades trades={trades} />
        ) : (
          <div className="w-full bg-white rounded-lg my-6 px-4 py-5">
            <p>There are no current trades</p>
          </div>
        )}
        {/* Last Row */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-white p-4 rounded-lg w-full h-full ">
            <h2 className="font-semibold text-orange-400 text-lg">
              Account Balance
            </h2>
            <p className="text-5xl font-bold text-gray-700 mt-3">
              {account.balance}
            </p>
          </div>
          <Box title={"Points"} data={points} tabs={fiveTabs} />
          <div className="bg-white p-4 rounded-lg w-full h-full ">
            <h2 className="font-semibold text-orange-400 text-lg">
              Account Name
            </h2>
            <p className="text-3xl font-bold text-gray-700 mt-3">
              {account.name}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg w-full h-full ">
            <h2 className="font-semibold text-orange-400 text-lg">
              Best Timeframe
            </h2>
            <p className="text-3xl font-bold text-gray-700 mt-3">
              {bestTimeFrame.month1}-{bestTimeFrame.month2}
            </p>
          </div>
        </div>
        <Graphs title={"Graphs"} data={graphData} />
      </div>
    </div>
  );
}

export default App;
