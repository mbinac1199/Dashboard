import React from "react";

function Tabs({ tabs, current, setCurrent, graph }) {
  return (
    <div
      className={`flex mt-6 flex-wrap text-xs text-gray-500 ${
        !graph ? "justify-between" : "space-x-4"
      }`}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setCurrent(tab.toLowerCase())}
          className={`${tab.toLowerCase() === current && "font-bold"}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
