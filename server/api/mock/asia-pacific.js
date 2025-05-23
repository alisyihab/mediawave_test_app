export default defineEventHandler((event) => {
  const query = getQuery(event);
  const period = query.period || "7d";
  const country = query.country;

  // Filter by period
  const multiplier = period === "month" ? 1 : 0.25;

  // Base Data
  const baseData = {
    Japan: { sales: 8000, brandRatio: [0.6, 0.4] },
    Australia: { sales: 7000, brandRatio: [0.5, 0.5] },
    Indonesia: { sales: 6000, brandRatio: [0.4, 0.6] },
    Thailand: { sales: 5000, brandRatio: [0.7, 0.3] },
    Philippines: { sales: 3000, brandRatio: [0.3, 0.7] },
    Malaysia: { sales: 2000, brandRatio: [0.5, 0.5] },
  };

  // Filter data
  const filteredCountries = country
    ? { [country]: baseData[country] }
    : baseData;

  // Generate breakdown
  const breakdown = Object.entries(filteredCountries).map(
    ([country, data]) => ({
      country,
      sales: Math.round(data.sales * multiplier),
      brandRatio: data.brandRatio,
    })
  );

  // Generate monthly sales data by filter
  const generateBrandData = (brandIndex) => {
    return breakdown.reduce((acc, item) => {
      const countryData = [300, 350, 400, 450, 500].map((base) =>
        Math.round(
          base * multiplier * item.brandRatio[brandIndex] * (item.sales / 1000)
        )
      );
      return acc.length
        ? acc.map((val, i) => val + countryData[i])
        : countryData;
    }, []);
  };

  const monthlySales = [
    { name: "Iphin", data: generateBrandData(0) },
    { name: "Sumsang", data: generateBrandData(1) },
  ];

  // Generate points for map
  const pointsMap = {
    Japan: [35.7, 139.7],
    Australia: [-33.9, 151.2],
    Indonesia: [-6.2, 106.8],
    Thailand: [13.75, 100.5167],
    Philippines: [14.6, 120.98],
    Malaysia: [3.139, 101.6869],
  };

  return {
    total: breakdown.reduce((sum, i) => sum + i.sales, 0),
    change: 1500,
    breakdown,
    points: breakdown.map((item) => ({
      coords: pointsMap[item.country],
      count: item.sales,
    })),
    monthlySales,
  };
});
