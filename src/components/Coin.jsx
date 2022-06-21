import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { GetCoinData, GetCoinHistory, GetCoinSupply } from "../utils/api/coinranking";
import { formatNumber, formatPrice } from "../utils/utils";

import LanguageIcon from "@mui/icons-material/Language";
import ExploreIcon from "@mui/icons-material/Explore";
import ForumIcon from "@mui/icons-material/Forum";
import GitHubIcon from "@mui/icons-material/GitHub";
import RedditIcon from "@mui/icons-material/Reddit";
import TelegramIcon from "@mui/icons-material/Telegram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FaDiscord as DiscordIcon } from "react-icons/fa";
import { AiOutlineMedium as MediumIcon } from "react-icons/ai";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import VerifiedIcon from "@mui/icons-material/Verified";

import Chart from "./Chart";

import "../styles/coin.css";

const timeToLocal = (originalTime) => {
    const d = new Date(originalTime * 1000);
    return (
        Date.UTC(
            d.getFullYear(),
            d.getMonth(),
            d.getDate(),
            d.getHours(),
            d.getMinutes(),
            d.getSeconds(),
            d.getMilliseconds()
        ) / 1000
    );
};

const linkIcon = {
    website: <LanguageIcon />,
    bitcointalk: <ForumIcon />,
    explorer: <ExploreIcon />,
    github: <GitHubIcon />,
    reddit: <RedditIcon />,
    telegram: <TelegramIcon />,
    facebook: <FacebookIcon />,
    twitter: <TwitterIcon />,
    youtube: <YouTubeIcon />,
    linkedin: <LinkedInIcon />,
    medium: <MediumIcon />,
    instagram: <InstagramIcon />,
    discord: <DiscordIcon />,
};

// const Chart = ({ sparkline }) => {
//     const chartContainer = useRef();

//     useEffect(() => {
//         const chartOptions = {
//             layout: { textColor: "black", background: { type: "solid", color: "white" } },
//             height: 400,
//             timeScale: {
//                 timeVisible: true,
//                 secondsVisible: true,
//             },
//         };
//         const chart = createChart(chartContainer.current, chartOptions);
//         let areaSeries;

//         if (sparkline[sparkline.length - 1]?.value > sparkline[0]?.value) {
//             areaSeries = chart.addAreaSeries({
//                 lineColor: "rgb(22, 199, 132)",
//                 topColor: "rgb(22, 199, 132, 1)",
//                 bottomColor: "rgba(22, 199, 132, 0.05)",
//             });
//         } else {
//             areaSeries = chart.addAreaSeries({
//                 lineColor: "rgb(234, 57, 67)",
//                 topColor: "rgb(234, 57, 67, 1)",
//                 bottomColor: "rgba(234, 57, 67, 0.05)",
//             });
//         }

//         areaSeries.setData(sparkline);
//         chart.timeScale().fitContent();

//         return () => chart.remove();
//     }, [chartContainer, sparkline]);

//     return <div ref={chartContainer} />;
// };

const Coin = () => {
    const coinUuid = useParams().coinUuid;
    const coinDescription = useRef();

    const [sparkline, setSparkline] = useState([]);
    const [coin, setCoin] = useState({});
    const [supply, setSupply] = useState({});
    const [timePeriod, setTimePeriod] = useState("24h");

    const getCoinHistory = Promise.resolve(GetCoinHistory(coinUuid, [], timePeriod));
    const getCoinData = Promise.resolve(GetCoinData(coinUuid));
    const getCoinSupply = Promise.resolve(GetCoinSupply(coinUuid));

    useEffect(() => {
        getCoinHistory
            .then((res) => res.history)
            .then((res) => {
                setSparkline(
                    Array.from({ length: res.length }, (_, idx) => ({
                        time: timeToLocal(res[res.length - idx - 1].timestamp),
                        value: parseFloat(res[res.length - idx - 1].price),
                    }))
                );
            });
    }, [timePeriod]);

    useEffect(() => {
        window.scrollTo(0, 0);
        getCoinData.then((res) => setCoin(res));
        getCoinSupply.then((res) => setSupply(res.supply));
    }, []);

    useEffect(() => {
        coinDescription.current.innerHTML = coin?.description;
    }, [coinDescription, coin]);

    return (
        <div className="container-coin-wrapper">
            <div className="container-coin">
                <div className="container-coin-content">
                    <div className="coin-content-name">
                        <div className="content-name-first">
                            <img src={coin?.iconUrl} alt={coin?.name} />
                            <p>{coin?.name}</p>
                            <div className="tag">
                                <p>{coin?.symbol}</p>
                            </div>
                        </div>
                        <div className="content-name-second">
                            <div className="tag tag-active">
                                <p>Rank #{coin?.rank}</p>
                            </div>
                            <div className="tag">
                                <p>Coin</p>
                            </div>
                            <div className="tag">
                                <p>On {formatNumber(coin?.numberOfExchanges, 0)} Exchanges</p>
                            </div>
                            <div className="tag">
                                <p>On {formatNumber(coin?.numberOfMarkets, 0)} Markets</p>
                            </div>
                        </div>
                    </div>
                    <div className="coin-content-price">
                        <div className="content-price-first">
                            <p>{coin?.name} Price</p>
                            <div className="tag">
                                <p>{coin?.symbol}</p>
                            </div>
                        </div>
                        <div className="content-price-second">
                            <p>{formatPrice(coin?.price)}</p>
                            {coin?.change >= 0 ? (
                                <div className="tag change-up">
                                    <div>
                                        <ArrowDropUpIcon />
                                        <p>{coin?.change}%</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="tag change-down">
                                    <div>
                                        <ArrowDropDownIcon />
                                        <p>{-coin?.change}%</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="content-price-third">
                            <div className="tag">
                                <p>{formatNumber(coin?.btcPrice)} BTC</p>
                            </div>
                            <div className="tag">
                                <p>All-Time High {formatPrice(coin?.allTimeHigh?.price)}</p>
                            </div>
                        </div>
                    </div>
                    <div className="coin-content-links">
                        {coin?.links?.map((link, idx) => (
                            <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer">
                                <div className="tag">
                                    <div>
                                        {linkIcon[link.type]}
                                        <p>{link.name}</p>
                                    </div>
                                </div>
                            </a>
                        ))}
                    </div>
                    <div className="coin-content-details">
                        <div className="content-details-item">
                            <div className="details-item-inner">
                                <p className="item-inner-title">Market Cap</p>
                                <p className="item-inner-subtitle">
                                    {formatPrice(coin?.marketCap)}
                                </p>
                            </div>
                        </div>
                        <div className="content-details-item">
                            <div className="details-item-inner">
                                <div className="item-inner-title">
                                    <p>Volume</p>
                                    <div className="tag">
                                        <p>24h</p>
                                    </div>
                                </div>
                                <p className="item-inner-subtitle">
                                    {formatPrice(coin?.["24hVolume"])}
                                </p>
                            </div>
                            <div className="details-item-inner">
                                <p className="item-inner-title">Volume / Market Cap</p>
                                <p className="item-inner-subtitle">
                                    {formatNumber(
                                        parseFloat(parseFloat(coin?.["24hVolume"])) /
                                            parseFloat(coin?.marketCap)
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="content-details-item">
                            <div className="details-item-inner">
                                <div className="item-inner-title">
                                    <p>Circulating Supply</p>
                                    {coin?.supply?.confirmed ? (
                                        <VerifiedIcon style={{ color: "#4500ff" }} />
                                    ) : null}
                                </div>
                                <p className="item-inner-subtitle">
                                    {formatNumber(supply?.circulatingAmount)} {coin?.symbol}
                                </p>
                            </div>
                            {supply?.maxAmount !== null ? (
                                <div className="progress-bar">
                                    <div className="progress-bar-inner">
                                        <div
                                            style={{
                                                width: `${formatNumber(
                                                    (supply?.circulatingAmount * 100) /
                                                        supply?.maxAmount,
                                                    0
                                                )}%`,
                                            }}
                                        ></div>
                                    </div>
                                    <p>
                                        {formatNumber(
                                            (supply?.circulatingAmount * 100) / supply?.maxAmount,
                                            0
                                        )}
                                        %
                                    </p>
                                </div>
                            ) : null}
                            <div className="details-item-inner">
                                <div className="item-inner-title">
                                    <p>Max Supply</p>
                                    <p>
                                        {supply?.maxAmount !== null
                                            ? formatNumber(supply?.maxAmount)
                                            : "-"}
                                    </p>
                                </div>
                                <div className="item-inner-title">
                                    <p>Total Supply</p>
                                    <p>{formatNumber(supply?.circulatingAmount)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-coin-chart">
                    <div className="coin-chart-options-wrapper">
                        <p>{coin?.name} to USD chart</p>
                        <div className="coin-chart-options tag">
                            <button
                                className={
                                    timePeriod === "3h"
                                        ? "chart-options-item page icon-wrapper selected"
                                        : "chart-options-item page icon-wrapper"
                                }
                                onClick={() => setTimePeriod("3h")}
                            >
                                3H
                            </button>
                            <button
                                className={
                                    timePeriod === "24h"
                                        ? "chart-options-item page icon-wrapper selected"
                                        : "chart-options-item page icon-wrapper"
                                }
                                onClick={() => setTimePeriod("24h")}
                            >
                                1D
                            </button>
                            <button
                                className={
                                    timePeriod === "7d"
                                        ? "chart-options-item page icon-wrapper selected"
                                        : "chart-options-item page icon-wrapper"
                                }
                                onClick={() => setTimePeriod("7d")}
                            >
                                7D
                            </button>
                            <button
                                className={
                                    timePeriod === "30d"
                                        ? "chart-options-item page icon-wrapper selected"
                                        : "chart-options-item page icon-wrapper"
                                }
                                onClick={() => setTimePeriod("30d")}
                            >
                                1M
                            </button>
                            <button
                                className={
                                    timePeriod === "3m"
                                        ? "chart-options-item page icon-wrapper selected"
                                        : "chart-options-item page icon-wrapper"
                                }
                                onClick={() => setTimePeriod("3m")}
                            >
                                3M
                            </button>
                            <button
                                className={
                                    timePeriod === "1y"
                                        ? "chart-options-item page icon-wrapper selected"
                                        : "chart-options-item page icon-wrapper"
                                }
                                onClick={() => setTimePeriod("1y")}
                            >
                                1Y
                            </button>
                            <button
                                className={
                                    timePeriod === "3y"
                                        ? "chart-options-item page icon-wrapper selected"
                                        : "chart-options-item page icon-wrapper"
                                }
                                onClick={() => setTimePeriod("3y")}
                            >
                                3Y
                            </button>
                            <button
                                className={
                                    timePeriod === "5y"
                                        ? "chart-options-item page icon-wrapper selected"
                                        : "chart-options-item page icon-wrapper"
                                }
                                onClick={() => setTimePeriod("5y")}
                            >
                                5Y
                            </button>
                        </div>
                    </div>
                    <Chart sparkline={sparkline} />
                </div>
                <div className="container-coin-description">
                    <div className="coin-description-title">
                        <p>About {coin?.name}</p>
                    </div>
                    <div ref={coinDescription} className="coin-description-content"></div>
                </div>
            </div>
        </div>
    );
};

export default Coin;
