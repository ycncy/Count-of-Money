import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import {
  VictoryChart,
  VictoryAxis,
  VictoryCandlestick,
  VictoryTooltip,
  VictoryZoomContainer,
  DomainTuple
} from 'victory';
import { getOneCoinHistory } from '../api/user';
import { Granularity } from '../types';

export const Charts = () => {
  const [granularity, setGranularity] = useState(Granularity.DAY);
  const [isLogarithmic, setIsLogarithmic] = useState(false);

  const { data: coinHistory, refetch } = useQuery(
    ["coinHistory", granularity],
    () => getOneCoinHistory(1, granularity),
    { enabled: !!granularity }
  );

  useEffect(() => {
    refetch();
  }, [granularity, refetch]);

  const xTickFormat = (date: Date) => {
    const newDate = new Date(date);
    switch (granularity) {
      case Granularity.MONTH:
      case Granularity.WEEK:
      case Granularity.FIVE_DAYS:
      case Granularity.DAY:
        return newDate.toLocaleDateString();
      case Granularity.HOUR:
      case Granularity.MINUTE:
        return newDate.toLocaleTimeString();
      default:
        return newDate.toLocaleString();
    }
  };

  const domain = coinHistory?.dataPoints.length
    ? {
        y: [Math.min(...coinHistory.dataPoints.map(d => d.low)), Math.max(...coinHistory.dataPoints.map(d => d.high))] as DomainTuple,
        x: [new Date(coinHistory.dataPoints[0].x), new Date(coinHistory.dataPoints[coinHistory.dataPoints.length - 1].x)] as DomainTuple
      }
    : undefined;

  return (
    <>
      <button onClick={() => setGranularity(Granularity.MINUTE)}>minute</button>
      <button onClick={()=> setGranularity(Granularity.HOUR)}>hour</button>
      <button onClick={()=> setGranularity(Granularity.DAY)}>day</button>
      <button onClick={()=> setGranularity(Granularity.FIVE_DAYS)}>5 days</button>
      <button onClick={()=> setGranularity(Granularity.WEEK)}>week</button>
      <button onClick={()=> setGranularity(Granularity.MONTH)}>month</button>  
      <br/> 
      <button onClick={()=> setIsLogarithmic(!isLogarithmic)}>Log</button>   

      {coinHistory && <div>Coin :{coinHistory.symbol} Granularity: {granularity}</div>}

      <VictoryChart
        height={300}
        width={500}
        scale={{ x: "time", y: isLogarithmic ? "log" : "linear" }}
        domain={domain}
        domainPadding={{ x: 50, y: [0, 20] }}
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
          />
        }
      >
        <VictoryAxis tickFormat={xTickFormat} />
        <VictoryAxis dependentAxis tickFormat={(price) => `$${price.toFixed(2)}`} />
        <VictoryCandlestick 
          candleColors={{ positive: "#32CD32", negative: "#B22222" }}
          data={coinHistory?.dataPoints}
          labels={({ datum }) => `${datum.x.toLocaleDateString()} \n $${datum.close.toFixed(2)}`}
          labelComponent={<VictoryTooltip style={{ fontSize: 10 }} flyoutStyle={{ stroke: "transparent", fill: "black" }} />}
        />
      </VictoryChart>
    </>
  );
};
