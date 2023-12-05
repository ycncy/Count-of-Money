import { useQuery } from 'react-query';
import { VictoryChart, VictoryAxis, VictoryCandlestick } from 'victory';
import { getOneCoinHistory } from '../api/user';

export const Charts = () => {
  const { data: coin } = useQuery(["Coins"], () => getOneCoinHistory(1));

  // Find the minimum and maximum values for the price to set a custom domain
  const priceValues = coin ? coin.map((d) => [d.high, d.low]).flat() : [];
  const maxPrice = Math.max(...priceValues);
  const minPrice = Math.min(...priceValues);

  // Define some padding for the domain
  const domainPadding = 0.05 * (maxPrice - minPrice); // 5% padding

  return (
    <VictoryChart
      scale={{ x: "time", y: "linear" }}
      domain={{
        y: [minPrice - domainPadding, maxPrice + domainPadding]
      }}
      domainPadding={{ x: 50, y: [0, 20] }}
    >
      <VictoryAxis
        tickFormat={(t) => `${new Date(t).toLocaleDateString()}`}
      />
      <VictoryAxis
        dependentAxis
        tickFormat={(price) => `$${price.toFixed(2)}`}
      />
      <VictoryCandlestick data={coin} />
    </VictoryChart>
  );
};
