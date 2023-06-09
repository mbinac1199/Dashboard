import React, { useState } from "react";
import Tabs from "./Tabs";

function Box({ title, data, tabs, currency, percentage, noDecimal }) {
  const [current, setCurrent] = useState(tabs[0].toLowerCase());
  return (
    <div className="bg-white p-4 rounded-lg w-full h-full flex flex-col justify-between">
      <h2 className="font-semibold text-orange-400 text-lg">{title}</h2>
      <p className="text-5xl font-bold text-gray-700 mt-3">
        {noDecimal ? (
          <span>{data[current]}</span>
        ) : (
          <span>
            {currency && "$"}
            {isNaN(data[current]) ? data[current] : data[current].toFixed(1)}
            {percentage && "%"}
          </span>
        )}
      </p>
      <Tabs tabs={tabs} current={current} setCurrent={setCurrent} />
    </div>
  );
}

export default Box;
