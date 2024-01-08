import React, {useEffect, useState} from "react";
import {useQuery} from "react-query";
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

import {getOneCoinHistory} from "../api/user";
import {Granularity} from "../types";
import {useParams} from "react-router-dom";
import {NavBarConnectedUser} from "../composant/Navbar/NavBarConnectedUser";
import {NavBar} from "../composant/Navbar/NavBar";
import cookies from "js-cookie";
import {publicCoinsService} from "../services/coins/public/public.coins.service";
import {LocalCoinInfo} from "../services/coins/public/public.coins.interfaces";

export function Charts() {
    const [isUserLogged, setIsUserLogged] = useState<boolean>(false);
    const [coinInfos, setCoinsInfos] = useState<LocalCoinInfo>({} as LocalCoinInfo);
    const {coinId} = useParams();
    const [granularity, setGranularity] = useState(Granularity.WEEK);
    const [isLogarithmic, setIsLogarithmic] = useState(false);
    const [displayVolume, setDisplayVolume] = useState(false);

    const {data: coinHistory, refetch} = useQuery(
        ["coinHistory", granularity],
        () => getOneCoinHistory(Number(coinId), granularity),
        {enabled: !!granularity}
    );

    useEffect(() => {
        const fetchCoinInfos = async () => {
            publicCoinsService.getLocalCoinById(Number(coinId)).then((response) => {
                setCoinsInfos(response);
            });
        }
        fetchCoinInfos();
        const accesToken = cookies.get('access_token');
        console.log(cookies.get('access_token'));
        if (accesToken) {
            console.log(`connected`);
            setIsUserLogged(true);
        }
    }, []);

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
        <div className="min-h-screen bg-[#171B26]">
            {isUserLogged ? <NavBarConnectedUser/> : <NavBar/>}
            <div className="grid grid-cols-[1fr_4fr] bg-[#171B26] pr-8 w-full">
                <div className="flex flex-col gap-4 justify-center p-4 text-white">
                    <div className="flex items-center gap-4">
                        <div
                            className='flex justify-center items-center w-10 h-10 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12'>
                            <img
                                width='30'
                                height='30'
                                src={coinInfos.imageUrl}
                                alt=''
                                className='stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out'
                            />
                        </div>
                        <h1 className="text-3xl text-semibold">
                            {coinInfos.fullName} ({coinInfos.symbol})
                        </h1>
                    </div>
                    <p className="text-xl">
                        {coinInfos.description}
                    </p>
                </div>
                <div className="bg-[#171B26] m-auto items-center justify-center flex flex-row-reverse w-full">
                    <div className="flex flex-col">
                        <div className="flex flex-col">
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
                        <div className="flex flex-col">
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
                    <VictoryChart
                        style={{parent: {backgroundColor: "#171B26"}}}
                        height={250}
                        width={500}
                        scale={{x: "time", y: isLogarithmic ? "log" : "linear"}}
                        domain={combinedDomain}
                        domainPadding={{x: 50, y: [0, 20]}}
                        containerComponent={<VictoryZoomContainer/>}
                    >
                        <VictoryLabel
                            text={`Graphique de ${coinHistory?.symbol} - Granularité: ${granularity}`}
                            x={150}
                            y={30}
                            textAnchor="middle"
                            style={{fontSize: 10, fill: "#B2B5BE"}}
                        />

                        <VictoryAxis
                            tickFormat={xTickFormat}
                            style={{
                                tickLabels: {
                                    fontSize: 6,
                                    padding: 5,
                                    angle: 45,
                                    fill: "#B2B5BE"
                                },
                                grid: {stroke: "#494646"}
                            }}
                            tickCount={5}
                        />

                        <VictoryAxis
                            dependentAxis
                            style={{
                                tickLabels: {fontSize: 6, padding: 5, fill: "#B2B5BE"},
                                grid: {stroke: "#494646"}
                            }}
                            tickFormat={(t) => `$${(t / 1000).toFixed(0)}k`}
                            tickCount={5}
                        />

                        <VictoryCandlestick
                            candleColors={{positive: "#26A69A", negative: "#F05350"}}
                            data={modifiedDataPoints}
                            labels={({datum}) =>
                                `${datum.x.toLocaleDateString()} \n $${datum.close.toFixed(2)}`
                            }
                            labelComponent={
                                <VictoryTooltip
                                    style={{fontSize: 10}}
                                    flyoutStyle={{stroke: "transparent", fill: "white"}}
                                />
                            }
                        />
                        {lastPrice && (
                            <VictoryLine
                                style={{
                                    data: {stroke: "red", strokeWidth: 0.4, opacity: 0.5}
                                }}
                                y={() => lastPrice}
                            />
                        )}
                        {lastPrice && (
                            <VictoryLabel
                                text={`$${lastPrice.toFixed(2)}`}
                                x={25}
                                y={240 - (lastPrice / maxPrice) * 240}
                                style={{fill: "red", fontSize: 5, fontFamily: "sans-serif"}}
                            />
                        )}
                        {displayVolume && (
                            <VictoryBar
                                data={modifiedDataPoints.map((dp) => ({
                                    x: dp.x,
                                    y: dp.volume,
                                    fill: dp.volumeColor
                                }))}
                                style={{data: {fill: ({datum}) => datum.fill}}}
                            />
                        )}
                    </VictoryChart>
                </div>
            </div>
        </div>
    );
}
