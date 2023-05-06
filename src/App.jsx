import "./App.css";
import Box from "./components/Box";
import Graphs from "./components/Graphs";
import CurrentTrades from "./components/CurrentTrades";

function App() {
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
      type: "Buy",
      profit: -40,
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
            data={{ hour: 25, day: 50, week: 80, month: 100, ytd: 150 }}
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
