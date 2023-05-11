import React, { useState } from "react";

function CurrentTrades({ trades }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  if (trades.length == 0 || !trades)
    return (
      <div className="w-full bg-white rounded-lg my-6 px-4 py-5">
        <p>There are no current trades</p>
      </div>
    );
  return (
    <div className="w-full bg-white rounded-lg my-6 px-4 py-5">
      <h2 className="font-semibold text-orange-400 text-4xl">Current Trades</h2>
      <h3 className="font-semibold text-2xl mt-2">Trade {selectedIndex + 1}</h3>
      <div className="flex space-x-2 items-center">
        <p className="text-gray-900 font-semibold">
          {trades[selectedIndex]?.type === "POSITION_TYPE_BUY"
            ? "Buying"
            : "Selling"}
        </p>
        <p
          className={`font-bold ${
            trades[selectedIndex].profit > 0 ? "text-green-500" : "text-red-600"
          }`}
        >
          {trades[selectedIndex].profit}
        </p>
      </div>
      <div className="mt-1 grid lg:grid-cols-3 text-gray-600">
        <p>
          <span className="font-medium">Account: </span>
          {trades[selectedIndex].accountId}
        </p>
        <p>
          <span className="font-medium">Order: </span>
          {trades[selectedIndex]._id}
        </p>
        <p>
          <span className="font-medium">Entry Price: </span>$
          {trades[selectedIndex].openPrice}
        </p>
        {/* <p>
          <span className="font-medium">S/L: </span>
          {trades[selectedIndex].sl}
        </p>
        <p>
          <span className="font-medium">T/P: </span>
          {trades[selectedIndex].tp}
        </p>
        <p>
          <span className="font-medium">Current Price: </span>$
          {trades[selectedIndex].currentPrice}
        </p>
        <p>
          <span className="font-medium">Expert Advisor: </span>
          {trades[selectedIndex].advisor}
        </p> */}
        {/* <p>
          <span className="font-medium">Estimated Profit: </span>
          {trades[selectedIndex].estimatedProfit}
        </p> */}
        <p>
          <span className="font-medium">Running Time in Trade: </span>
          {trades[selectedIndex].durationInMinutes} minutes
        </p>
      </div>
      <div className="flex mt-3 justify-center space-x-2">
        {trades.map((page, index) => (
          <button
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`${index === selectedIndex && "font-medium"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CurrentTrades;
