import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { VictoryChart, VictoryAxis, VictoryCandlestick, VictoryTooltip, VictoryZoomContainer } from 'victory';
import { useState } from 'react';
import { getOneCoinHistory } from '../api/user';
import { Granularity } from '../types';

export const Charts = () => {
  const [granularity, setGranularity] = useState(Granularity.DAY);
  const [zoomDomain, setZoomDomain] = useState();
  const [isCursorOverChart, setIsCursorOverChart] = useState(false);

  const { data: coinHistory, refetch } = useQuery(
    ["coinHistory", granularity], 
    () => getOneCoinHistory(12, granularity), 
    { enabled: !!granularity }
  );

  // Call refetch whenever granularity changes
  useEffect(() => {
    refetch();
  }, [granularity, refetch]);

  // Determine the appropriate tick format based on granularity
  const xTickFormat = (date: Date) => {
    // Create a new date object from the date string
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

  // Define domain for the chart
  const domain = useMemo(() => {
    if (!coinHistory || coinHistory.dataPoints.length === 0) {
      // Default domain if there's no data
      return { y: [0, 1] as [number, number], x: [new Date(), new Date()] as [Date, Date] };
    }
    
    const priceValues = coinHistory.dataPoints.map((d) => [d.high, d.low]).flat();
    const maxPrice = Math.max(...priceValues);
    const minPrice = Math.min(...priceValues);
    const domainPadding = 0.05 * (maxPrice - minPrice); // 5% padding
    
    // Find the earliest and latest date for the x domain
    const dates = coinHistory.dataPoints.map(d => new Date(d.x));
    const minDate = new Date(Math.min(...dates.map(date => date.getTime())));
    const maxDate = new Date(Math.max(...dates.map(date => date.getTime())));
    
    return {
      y: [minPrice - domainPadding, maxPrice + domainPadding] as [number, number],
      x: [minDate, maxDate] as [Date, Date], // This ensures the x domain is treated as Date objects
    };
  }, [coinHistory]);
  
  

  const handleZoomDomainChange = (newDomain: any) => {
    if (isCursorOverChart) {
      setZoomDomain(newDomain);
    }
  };


  return (
    <>
      <button onClick={() => setGranularity(Granularity.MINUTE)}>minute</button>
      <button onClick={()=> setGranularity(Granularity.HOUR)}>hour</button>
      <button onClick={()=> setGranularity(Granularity.DAY)}>day</button>
      <button onClick={()=> setGranularity(Granularity.FIVE_DAYS)}>5 days</button>
      <button onClick={()=> setGranularity(Granularity.WEEK)}>week</button>
      <button onClick={()=> setGranularity(Granularity.MONTH)}>month</button>   

      {coinHistory && <div>Coin :{coinHistory.symbol} Granularity: {granularity}</div>}
      <div onMouseEnter={() => setIsCursorOverChart(true)}
        onMouseLeave={() => setIsCursorOverChart(false)}>
        <VictoryChart
          scale={{ x: "time", y: "linear" }}
          domain={domain}
          domainPadding={{ x: 50, y: [0, 20] }}
          containerComponent={
            <VictoryZoomContainer
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={handleZoomDomainChange}
            allowZoom={isCursorOverChart} // Active le zoom seulement si le curseur est sur le graphique
            />
          }
          >
          <VictoryAxis tickFormat={xTickFormat} />
          <VictoryAxis dependentAxis tickFormat={(price) => `$${price.toFixed(2)}`} />
          <VictoryCandlestick 
            candleColors={{ positive: "#32CD32", negative: "#B22222" }}
            data={coinHistory?.dataPoints}
            labels={({ datum }) => `${datum.x.toLocaleDateString()} \n $${datum.close.toFixed(2)}`}
            labelComponent={
              <VictoryTooltip 
              style={{ fontSize: 10 }} 
              flyoutStyle={{ stroke: "transparent", fill: "black" }} 
              />
            }
            />
        </VictoryChart>
      </div>
    </>
  );
};


