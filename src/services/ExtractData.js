export default (data) => {
  // Calculate profit/loss for each order
  //   data.data.forEach((order) => {
  //     if (order.type === "ORDER_TYPE_BUY") {
  //       order.profit = (order.closePrice - order.openPrice) * order.volume;
  //     } else if (order.type === "ORDER_TYPE_SELL") {
  //       order.profit = (order.openPrice - order.closePrice) * order.volume;
  //     }
  //   });

  //   // Calculate total profit/loss for all orders
  //   const profit = data.data.reduce((acc, order) => acc + (order.profit || 0), 0);
  //   console.log(profit);

  let profit = 0,
    winCount = 0,
    lossCount = 0,
    total = 0;
  data.data.forEach((order) => {
    if (order.type != "DEAL_TYPE_BALANCE") {
      total++;
      profit += order.profit;
      if (order.profit >= 0) winCount++;
      else if (order.profit < 0) lossCount++;
    }
  });
  const winPercentage = (winCount / total) * 100 || 0;
  const lossPercentage = (lossCount / total) * 100 || 0;
  const points = profit / total || 0;
  return { profit, winPercentage, lossPercentage, points, total };
};
