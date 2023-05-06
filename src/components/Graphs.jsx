import React, { useState } from "react";
import Tabs from "./Tabs";

function Graphs({ data, tabs }) {
  const [current, setCurrent] = useState(tabs[0].toLowerCase());
  return (
    <div className="bg-white p-4 rounded-lg w-full h-full flex flex-col justify-between">
      <h2 className="font-semibold text-orange-400 text-4xl">Graphs</h2>
      {/* Graph */}
      <Tabs
        tabs={tabs}
        current={current}
        setCurrent={setCurrent}
        graph={true}
      />
    </div>
  );
}

export default Graphs;
