import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function Graphs({ data }) {
  return (
    <div className="bg-white p-4 rounded-lg w-full h-full flex flex-col justify-between">
      <h2 className="font-semibold text-orange-400 text-4xl">Graphs</h2>
      <div className=" px-2 md:px-8 lg:px-20 py-3 lg:pt-5">
        <Bar data={data} />
      </div>
    </div>
  );
}

export default Graphs;
