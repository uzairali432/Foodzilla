const DEFAULT_CHART_COLORS = ["#10B981", "#3B82F6", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4"];

const formatCurrency = (amount) => `Rs. ${Number(amount || 0).toLocaleString()}`;

const percentChange = (current, previous) => {
  if (previous > 0) return ((current - previous) / previous) * 100;
  return current > 0 ? 100 : 0;
};

const getStatusLabel = (status) => {
  const normalized = String(status || "").toLowerCase();
  if (normalized === "delivered" || normalized === "completed") return "completed";
  if (normalized === "processing") return "processing";
  if (normalized === "cancelled") return "cancelled";
  return "pending";
};

const getCity = (deliveryAddress) => {
  if (!deliveryAddress || typeof deliveryAddress !== "string") return "Unknown";
  const segments = deliveryAddress
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  return segments.length > 0 ? segments[segments.length - 1] : "Unknown";
};

const getRecentMonths = (count = 6) => {
  const now = new Date();
  const months = [];

  for (let i = count - 1; i >= 0; i -= 1) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      key: `${d.getFullYear()}-${d.getMonth()}`,
      label: d.toLocaleString("default", { month: "short" }),
      start: new Date(d.getFullYear(), d.getMonth(), 1).getTime(),
      end: new Date(d.getFullYear(), d.getMonth() + 1, 1).getTime(),
    });
  }

  return months;
};

export const buildSalesReport = (orders = []) => {
  const safeOrders = Array.isArray(orders) ? orders : [];

  const cityRevenue = new Map();
  const productRevenue = new Map();
  const productOrders = new Map();
  const currentMonthRevenue = new Map();
  const previousMonthRevenue = new Map();

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const previousDate = new Date(currentYear, currentMonth - 1, 1);

  const monthlyRevenue = getRecentMonths(6).map((month) => ({
    month: month.label,
    revenue: 0,
    monthKey: month.key,
    rangeStart: month.start,
    rangeEnd: month.end,
  }));

  safeOrders.forEach((order) => {
    const orderDate = new Date(order.createdAt || Date.now());
    const totalAmount = Number(order.totalAmount || 0);
    const city = getCity(order.deliveryAddress);

    cityRevenue.set(city, (cityRevenue.get(city) || 0) + totalAmount);

    const orderTime = orderDate.getTime();
    for (const month of monthlyRevenue) {
      if (orderTime >= month.rangeStart && orderTime < month.rangeEnd) {
        month.revenue += totalAmount;
        break;
      }
    }

    const orderMonth = orderDate.getMonth();
    const orderYear = orderDate.getFullYear();

    (order.items || []).forEach((item) => {
      const name = item?.name || "Unknown Product";
      const quantity = Number(item?.quantity || 0);
      const price = Number(item?.price || 0);
      const itemRevenue = quantity * price;

      productRevenue.set(name, (productRevenue.get(name) || 0) + itemRevenue);
      productOrders.set(name, (productOrders.get(name) || 0) + quantity);

      if (orderMonth === currentMonth && orderYear === currentYear) {
        currentMonthRevenue.set(name, (currentMonthRevenue.get(name) || 0) + itemRevenue);
      }

      if (orderMonth === previousDate.getMonth() && orderYear === previousDate.getFullYear()) {
        previousMonthRevenue.set(name, (previousMonthRevenue.get(name) || 0) + itemRevenue);
      }
    });
  });

  const totalRevenue = safeOrders.reduce(
    (sum, order) => sum + Number(order.totalAmount || 0),
    0
  );
  const deliveredOrders = safeOrders.filter((order) => {
    const status = String(order.status || "").toLowerCase();
    return status === "delivered" || status === "completed";
  }).length;
  const cancelledOrders = safeOrders.filter(
    (order) => String(order.status || "").toLowerCase() === "cancelled"
  ).length;

  const totalProductRevenue = Array.from(productRevenue.values()).reduce((sum, amount) => sum + amount, 0);

  const salesByCategory = Array.from(productRevenue.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, amount], index) => {
      const percentage = totalProductRevenue > 0 ? (amount / totalProductRevenue) * 100 : 0;
      return {
        name,
        value: Number(percentage.toFixed(1)),
        color: DEFAULT_CHART_COLORS[index % DEFAULT_CHART_COLORS.length],
      };
    });

  const topProducts = Array.from(productRevenue.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, revenue]) => {
      const current = currentMonthRevenue.get(name) || 0;
      const previous = previousMonthRevenue.get(name) || 0;
      const changePct = percentChange(current, previous);

      return {
        name,
        orders: productOrders.get(name) || 0,
        revenue: formatCurrency(revenue),
        trend: changePct >= 0 ? "up" : "down",
        change: `${changePct >= 0 ? "+" : ""}${changePct.toFixed(1)}%`,
      };
    });

  const recentOrders = [...safeOrders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8)
    .map((order) => ({
      id: order.orderNumber || String(order._id || "N/A").slice(-6),
      customer: order.customer?.name || "Guest",
      product:
        order.items?.map((item) => item?.name).filter(Boolean).join(", ") ||
        "No items",
      amount: formatCurrency(order.totalAmount),
      status: getStatusLabel(order.status),
      date: new Date(order.createdAt || Date.now()).toLocaleDateString(),
    }));

  const cityData = Array.from(cityRevenue.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([city, revenue]) => ({ city, revenue: Number(revenue.toFixed(2)) }));

  const cleanedMonthlyRevenue = monthlyRevenue.map((month) => ({
    month: month.month,
    revenue: Number(month.revenue.toFixed(2)),
  }));

  const monthlyFinance = cleanedMonthlyRevenue.map((month) => ({
    month: month.month,
    revenue: month.revenue,
    expense: Number((month.revenue * 0.62).toFixed(2)),
  }));

  const currentMonthRevenueTotal =
    cleanedMonthlyRevenue[cleanedMonthlyRevenue.length - 1]?.revenue || 0;
  const previousMonthRevenueTotal =
    cleanedMonthlyRevenue[cleanedMonthlyRevenue.length - 2]?.revenue || 0;
  const growthRate = percentChange(
    currentMonthRevenueTotal,
    previousMonthRevenueTotal
  );

  const forecastData = cleanedMonthlyRevenue.map((month, index, arr) => {
    if (index < arr.length - 1) {
      return { month: month.month, forecast: month.revenue };
    }

    return { month: month.month, forecast: month.revenue };
  });

  let rollingForecastBase = currentMonthRevenueTotal;
  const projectedGrowth = Math.max(growthRate / 100, 0.03);
  for (let i = 1; i <= 3; i += 1) {
    const projectedDate = new Date(new Date().getFullYear(), new Date().getMonth() + i, 1);
    rollingForecastBase = rollingForecastBase * (1 + projectedGrowth);
    forecastData.push({
      month: projectedDate.toLocaleString("default", { month: "short" }),
      forecast: Number(rollingForecastBase.toFixed(2)),
    });
  }

  const regionData = cityData.map((entry) => ({
    region: entry.city,
    sales: entry.revenue,
  }));

  const cancellationRate = safeOrders.length
    ? (cancelledOrders / safeOrders.length) * 100
    : 0;
  const completionRate = safeOrders.length
    ? (deliveredOrders / safeOrders.length) * 100
    : 0;
  const averageOrderValue = safeOrders.length ? totalRevenue / safeOrders.length : 0;

  const insightCards = [
    {
      title: "Revenue Growth",
      value: `${growthRate >= 0 ? "+" : ""}${growthRate.toFixed(1)}%`,
      desc: "Compared with last month",
      trend: growthRate >= 0 ? "up" : "down",
      level: Math.min(Math.abs(growthRate), 100),
      type: "growth",
    },
    {
      title: "Completion Rate",
      value: `${completionRate.toFixed(1)}%`,
      desc: "Orders delivered successfully",
      trend: completionRate >= 85 ? "up" : "down",
      level: completionRate,
      type: "completion",
    },
    {
      title: "Avg Order Value",
      value: formatCurrency(averageOrderValue),
      desc: "Average basket size",
      trend: "up",
      level: Math.min((averageOrderValue / 2500) * 100, 100),
      type: "average",
    },
    {
      title: "Cancellation Rate",
      value: `${cancellationRate.toFixed(1)}%`,
      desc: "Cancelled out of total orders",
      trend: cancellationRate <= 10 ? "up" : "down",
      level: Math.max(100 - cancellationRate, 5),
      type: "risk",
    },
  ];

  const topProductName = topProducts[0]?.name || "your best seller";
  const weakestCity = cityData[cityData.length - 1]?.city || "lower-performing area";
  const suggestions = [
    `Promote ${topProductName} with bundle deals to increase average order value.`,
    `Run location-based offers in ${weakestCity} to improve regional sales balance.`,
    cancellationRate > 10
      ? "Audit delayed preparation and delivery handoff to lower cancellations."
      : "Maintain current fulfillment workflow; cancellation trend is healthy.",
  ];

  return {
    salesByCategory,
    topProducts,
    recentOrders,
    cityData,
    monthlyRevenue: cleanedMonthlyRevenue,
    monthlyFinance,
    forecastData,
    regionData,
    insightCards,
    suggestions,
    summary: {
      totalOrders: safeOrders.length,
      totalRevenue,
      deliveredOrders,
      cancelledOrders,
      completionRate,
      cancellationRate,
      averageOrderValue,
      growthRate,
      currentMonthRevenue: currentMonthRevenueTotal,
      previousMonthRevenue: previousMonthRevenueTotal,
    },
  };
};
