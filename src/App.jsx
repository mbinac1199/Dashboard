import "./App.css";
import Box from "./components/Box";

function App() {
  const fiveTabs = ["Hour", "Day", "Week", "Month", "YTD"];
  const tenTabs = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "a10"];

  return (
    <div className="bg-gray-50 h-screen">
      <div className="w-11/12 mx-auto pt-6">
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
            tabs={tenTabs}
          />
          <Box
            title={"All Accounts Trades"}
            data={{ hour: 25, day: 50, week: 80, month: 100, ytd: 150 }}
            tabs={fiveTabs}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
