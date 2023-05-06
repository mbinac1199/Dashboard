import React, { useState } from "react";

function Box({ title, data, tabs }) {
  const [current, setCurrent] = useState(tabs[0].toLowerCase());
  return (
    <div className="bg-white p-4 rounded-lg w-full h-full flex flex-col justify-between">
      <p className="font-semibold text-gray-600 text-lg">{title}</p>
      <p className="text-5xl font-bold text-gray-700 mt-3">${data[current]}</p>
      <div className="flex justify-between mt-6 flex-wrap text-xs text-gray-500">
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
    </div>
  );
}

export default Box;
