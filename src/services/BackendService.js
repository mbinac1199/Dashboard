import axios from "axios";
import ExtractData from "./ExtractData";
import Config from "./Config";

const account = "e63657fc-e411-430e-b1c0-449094ea1e56";
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
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const daysToSubtract = currentDayOfWeek + 6;
  const mondayOfLastWeek = new Date(currentDate);
  mondayOfLastWeek.setDate(currentDate.getDate() - daysToSubtract);
  const sundayOfLastWeek = new Date(mondayOfLastWeek);
  sundayOfLastWeek.setDate(mondayOfLastWeek.getDate() + 6);
  const isomonday = mondayOfLastWeek.toISOString();
  const isosunday = sundayOfLastWeek.toISOString();
  try {
    const response = await axios.get(
      `https://mt-client-api-v1.new-york.agiliumtrade.ai/users/current/accounts/${account}/history-deals/time/${isomonday}/${isosunday}`,
      Config
    );

    return ExtractData(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const lastMonthProfit = async () => {
  const currentDate = new Date();
  currentDate.setDate(1);
  currentDate.setDate(currentDate.getDate() - 1);
  const lastDayOfPreviousMonth = new Date(currentDate);
  currentDate.setDate(1);
  const firstDayOfPreviousMonth = new Date(currentDate);
  const isoFirstDay = firstDayOfPreviousMonth.toISOString();
  const isoLastDay = lastDayOfPreviousMonth.toISOString();
  try {
    const response = await axios.get(
      `https://mt-client-api-v1.new-york.agiliumtrade.ai/users/current/accounts/${account}/history-deals/time/${isoFirstDay}/${isoLastDay}`,
      Config
    );
    return ExtractData(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const lastYearProfit = async () => {
  const firstDayOfYear = new Date(new Date().getFullYear(), 0, 1);
  const today = new Date();
  const isoFirstDay = firstDayOfYear.toISOString();
  const isoToday = today.toISOString();
  try {
    const response = await axios.get(
      `https://mt-client-api-v1.new-york.agiliumtrade.ai/users/current/accounts/${account}/history-deals/time/${isoFirstDay}/${isoToday}`,
      Config
    );
    return ExtractData(response);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const getTrades = async () => {
  try {
    const response1 = await axios.get(
      `https://mt-client-api-v1.new-york.agiliumtrade.ai/users/current/accounts/${account}/orders`,
      Config
    );
    const response2 = await axios.get(
      `https://metastats-api-v1.new-york.agiliumtrade.ai/users/current/accounts/${account}/open-trades`,
      Config
    );
    const mergedArray = response1.data.reduce((result, obj1) => {
      const obj2 = response2.data.openTrades.find((obj) => obj._id === obj1.id);
      if (obj2) {
        result.push({ ...obj1, ...obj2 });
      }
      return result;
    }, []);
    const mergedArray2 = mergedArray.map(async (obj) => {
      const response3 = await axios.get(
        `https://mt-client-api-v1.new-york.agiliumtrade.ai/users/current/accounts/${account}/symbols/${obj.symbol}/current-tick`,
        Config
      );
      return { ...obj, ...response3.data };
    });
    return mergedArray2;
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
