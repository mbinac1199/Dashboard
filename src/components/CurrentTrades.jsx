import React, { useState } from "react";
import { useEffect } from "react";
import { getTrades } from "../services/BackendService";

function CurrentTrades(balance) {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const updateTrades = async () => {
      const trades = await getTrades();
      setTrades(trades);
      setLoading(false);
    };
    updateTrades();
  }, []);
  const [selectedIndex, setSelectedIndex] = useState(0);
  if (loading)
    return (
      <div className="w-full bg-white rounded-lg my-6 px-4 py-5">
        <p>Loading current trades</p>
      </div>
    );
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
          {trades[selectedIndex]?.type === "ORDER_TYPE_SELL" ||
          trades[selectedIndex]?.type === "POSITION_TYPE_SELL"
            ? "Selling"
            : "Buying"}
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
          <span className="font-medium">Trade No: </span>
          {trades[selectedIndex].id}
        </p>
        <p>
          <span className="font-medium">Pair or Indice: </span>
          US500
        </p>
        <p>
          <span className="font-medium">Time Opened: </span>
          {trades[selectedIndex].openTime}
        </p>
        <p>
          <span className="font-medium">Open Price: </span>$
          {trades[selectedIndex].openPrice}
        </p>
        <p>
          <span className="font-medium">T/P: </span>
          {trades[selectedIndex].takeProfit}
        </p>
        <p>
          <span className="font-medium">S/L: </span>
          {trades[selectedIndex].stopLoss}
        </p>
        <p>
          <span className="font-medium">Lot Size: </span>
          {(balance * trades[selectedIndex].riskInBalancePercent) /
            (trades[selectedIndex].stopLoss * trades[selectedIndex].pips) || 0}
        </p>
        <p>
          <span className="font-medium">Current Price: </span>$
          {trades[selectedIndex].currentPrice}
        </p>
        <p>
          <span className="font-medium">Profit: </span>$
          {trades[selectedIndex].profit}
        </p>
        <p>
          <span className="font-medium">Net PTS: </span>$
          {trades[selectedIndex].bid - trades[selectedIndex].openPrice}
        </p>
        <p>
          <span className="font-medium">Status: </span>
          {trades[selectedIndex].state}
        </p>
        <p>
          <span className="font-medium">Time in Trade: </span>
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
