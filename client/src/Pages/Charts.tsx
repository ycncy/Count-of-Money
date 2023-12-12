import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {
  VictoryChart,
  VictoryAxis,
  VictoryCandlestick,
  VictoryTooltip,
  VictoryZoomContainer,
  DomainTuple,
  VictoryLabel,
  VictoryLine,
  VictoryBar
} from "victory";

import { getOneCoinHistory } from "../api/user";
import { Granularity } from "../types";

export function Charts() {
  const [granularity, setGranularity] = useState(Granularity.WEEK);
  const [isLogarithmic, setIsLogarithmic] = useState(false);
  const [displayVolume, setDisplayVolume] = useState(false);

  const { data: coinHistory, refetch } = useQuery(
    ["coinHistory", granularity],
    () => getOneCoinHistory(3, granularity),
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
        return newDate.toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit"
        });
      case Granularity.HOUR:
      case Granularity.MINUTE:
        return newDate.toLocaleTimeString();
      default:
        return newDate.toLocaleDateString("fr-FR", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit"
        });
    }
  };

  const lastPrice = coinHistory?.dataPoints.length
    ? coinHistory.dataPoints[coinHistory.dataPoints.length - 1].close
    : null;

  const volumeScaleFactor = isLogarithmic ? 5000000000 : 50000000;

  const modifiedDataPoints = coinHistory?.dataPoints
    ? coinHistory.dataPoints.map((dp) => ({
        ...dp,
        volume: dp.volume / volumeScaleFactor,
        volumeColor:
          dp.close > dp.open
            ? "rgba(38, 166, 154, 0.3)"
            : "rgba(240, 83, 80, 0.3)"
      }))
    : [];

  const combinedDomain = modifiedDataPoints.length
    ? {
        y: [
          Math.min(
            ...modifiedDataPoints.map((dp) => Math.min(dp.low, dp.volume))
          ),
          Math.max(
            ...modifiedDataPoints.map((dp) => Math.max(dp.high, dp.volume))
          )
        ] as DomainTuple,
        x: [
          new Date(modifiedDataPoints[0].x),
          new Date(modifiedDataPoints[modifiedDataPoints.length - 1].x)
        ] as DomainTuple
      }
    : undefined;

  const maxPrice = modifiedDataPoints.length
    ? Math.max(...modifiedDataPoints.map((dp) => dp.high))
    : 1;

  return (
    <>
      <div style={{ backgroundColor: "#171B26", display: "flex" }}>
        <VictoryChart
          style={{ parent: { maxWidth: "90%", backgroundColor: "#171B26" } }}
          height={240}
          width={400}
          scale={{ x: "time", y: isLogarithmic ? "log" : "linear" }}
          domain={combinedDomain}
          domainPadding={{ x: 50, y: [0, 20] }}
          containerComponent={<VictoryZoomContainer />}
        >
          <VictoryLabel
            text={`Graphique de ${coinHistory?.symbol} - Granularité: ${granularity}`}
            x={150} // Centre en fonction de la largeur de votre graphique
            y={30} // Position sur l'axe Y, ajustez en fonction de vos besoins
            textAnchor="middle"
            style={{ fontSize: 10, fill: "#B2B5BE" }}
          />
          {/* Axe X (dates) */}

          <VictoryAxis
            tickFormat={xTickFormat}
            style={{
              tickLabels: {
                fontSize: 6,
                padding: 5,
                angle: 45,
                fill: "#B2B5BE"
              },
              grid: { stroke: "#494646" }
            }}
            tickCount={5}
          />
          {/* Axe Y (prix) */}

          <VictoryAxis
            dependentAxis
            style={{
              tickLabels: { fontSize: 6, padding: 5, fill: "#B2B5BE" },
              grid: { stroke: "#494646" }
            }}
            tickFormat={(t) => `$${(t / 1000).toFixed(0)}k`}
            tickCount={5}
          />

          <VictoryCandlestick
            candleColors={{ positive: "#26A69A", negative: "#F05350" }}
            data={modifiedDataPoints}
            labels={({ datum }) =>
              `${datum.x.toLocaleDateString()} \n $${datum.close.toFixed(2)}`
            }
            labelComponent={
              <VictoryTooltip
                style={{ fontSize: 10 }}
                flyoutStyle={{ stroke: "transparent", fill: "white" }}
              />
            }
          />
          {/* ligne pour le prix */}
          {lastPrice && (
            <VictoryLine
              style={{
                data: { stroke: "red", strokeWidth: 0.4, opacity: 0.5 }
              }}
              y={() => lastPrice}
            />
          )}
          {lastPrice && (
            <VictoryLabel
              text={`$${lastPrice.toFixed(2)}`}
              x={25} // Position X du label (ajustez en fonction de l'axe des Y)
              y={240 - (lastPrice / maxPrice) * 240} // Position Y basée sur le dernier prix (ajustez selon votre échelle)
              style={{ fill: "red", fontSize: 5, fontFamily: "sans-serif" }}
            />
          )}
          {displayVolume && (
            <VictoryBar
              data={modifiedDataPoints.map((dp) => ({
                x: dp.x,
                y: dp.volume,
                fill: dp.volumeColor
              }))}
              style={{ data: { fill: ({ datum }) => datum.fill } }}
            />
          )}
        </VictoryChart>
        <div>
          <div>
            <button
              style={{
                backgroundColor: "grey",
                borderRadius: "15px",
                margin: "5px",
                padding: "5px"
              }}
              onClick={() => setGranularity(Granularity.MINUTE)}
            >
              minute
            </button>
            <button
              style={{
                backgroundColor: "grey",
                borderRadius: "15px",
                margin: "5px",
                padding: "5px"
              }}
              onClick={() => setGranularity(Granularity.HOUR)}
            >
              hour
            </button>
            <button
              style={{
                backgroundColor: "grey",
                borderRadius: "15px",
                margin: "5px",
                padding: "5px"
              }}
              onClick={() => setGranularity(Granularity.DAY)}
            >
              day
            </button>
            <button
              style={{
                backgroundColor: "grey",
                borderRadius: "15px",
                margin: "5px",
                padding: "5px"
              }}
              onClick={() => setGranularity(Granularity.FIVE_DAYS)}
            >
              5 days
            </button>
            <button
              style={{
                backgroundColor: "grey",
                borderRadius: "15px",
                margin: "5px",
                padding: "5px"
              }}
              onClick={() => setGranularity(Granularity.WEEK)}
            >
              week
            </button>
            <button
              style={{
                backgroundColor: "grey",
                borderRadius: "15px",
                margin: "5px",
                padding: "5px"
              }}
              onClick={() => setGranularity(Granularity.MONTH)}
            >
              month
            </button>
          </div>
          <br />
          <button
            style={{
              backgroundColor: "grey",
              borderRadius: "15px",
              margin: "5px",
              padding: "5px"
            }}
            onClick={() => setIsLogarithmic(!isLogarithmic)}
          >
            Log
          </button>
          <button
            style={{
              backgroundColor: "grey",
              borderRadius: "15px",
              margin: "5px",
              padding: "5px"
            }}
            onClick={() => setDisplayVolume(!displayVolume)}
          >
            Volumes
          </button>
        </div>
      </div>
    </>
  );
}
