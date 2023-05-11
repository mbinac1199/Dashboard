import axios from "axios";
import ExtractData from "./ExtractData";
import Config from "./Config";

const account = "929f666e-a469-4256-817f-89cfbc11cd8a";
const isoDateTime = new Date().toISOString();

const lastHourProfit = async () => {
  const lastHour = new Date();
  lastHour.setHours(lastHour.getHours() - 1);
  const isoLastHour = lastHour.toISOString();
  try {
    const response = await axios.get(
      `https://mt-client-api-v1.new-york.agiliumtrade.ai/users/current/accounts/${account}/history-deals/time/${isoLastHour}/${isoDateTime}`,
      Config
    );
    return ExtractData(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const lastDayProfit = async () => {
  const lastDay = new Date();
  lastDay.setDate(lastDay.getDate() - 1);
  const isoLastDay = lastDay.toISOString();
  try {
    const response = await axios.get(
      `https://mt-client-api-v1.new-york.agiliumtrade.ai/users/current/accounts/${account}/history-deals/time/${isoLastDay}/${isoDateTime}`,
      Config
    );
    return ExtractData(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const lastWeekProfit = async () => {
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const isoLastWeek = lastWeek.toISOString();
  try {
    const response = await axios.get(
      `https://mt-client-api-v1.new-york.agiliumtrade.ai/users/current/accounts/${account}/history-deals/time/${isoLastWeek}/${isoDateTime}`,
      Config
    );
    return ExtractData(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const lastMonthProfit = async () => {
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const isoLastMonth = lastMonth.toISOString();
  try {
    const response = await axios.get(
      `https://mt-client-api-v1.new-york.agiliumtrade.ai/users/current/accounts/${account}/history-deals/time/${isoLastMonth}/${isoDateTime}`,
      Config
    );
    return ExtractData(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const lastYearProfit = async () => {
  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);
  const isoLastYear = lastYear.toISOString();
  try {
    const response = await axios.get(
      `https://mt-client-api-v1.new-york.agiliumtrade.ai/users/current/accounts/${account}/history-deals/time/${isoLastYear}/${isoDateTime}`,
      Config
    );
    return ExtractData(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getTrades = async () => {
  try {
    const response = await axios.get(
      `https://metastats-api-v1.new-york.agiliumtrade.ai/users/current/accounts/${account}/open-trades`,
      Config
    );
    return response.data.openTrades;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getAccountInfo = async () => {
  try {
    const { data } = await axios.get(
      `https://mt-client-api-v1.new-york.agiliumtrade.ai/users/current/accounts/${account}/account-information`,
      Config
    );
    const { name, balance } = data;
    return { name, balance };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getBestTimeFrame = async () => {
  try {
    const date = new Date();
    let data = [],
      profit = 0;
    for (let i = 1; i < 12; i++) {
      date.setMonth(date.getMonth() - i);
      const month1 = date.toLocaleString("default", { month: "long" });
      const isoMonth = date.toISOString();
      date.setMonth(date.getMonth() + 1);
      const isoMonth2 = date.toISOString();
      const month2 = date.toLocaleString("default", { month: "long" });
      const response = await axios.get(
        `https://mt-client-api-v1.new-york.agiliumtrade.ai/users/current/accounts/${account}/history-deals/time/${isoMonth}/${isoMonth2}`,
        Config
      );
      response.data.forEach((order) => {
        profit += order.profit;
      });
      data.push({ profit, month1, month2 });
    }
    const bestTime = data.reduce((max, obj) => {
      return obj.profit > max.profit ? obj : max;
    });
    console.log(bestTime);
    return bestTime;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export {
  lastDayProfit,
  lastHourProfit,
  lastWeekProfit,
  lastMonthProfit,
  lastYearProfit,
  getTrades,
  getAccountInfo,
  getBestTimeFrame,
};
