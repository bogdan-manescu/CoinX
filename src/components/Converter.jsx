import React, { useEffect, useRef, useState } from "react";

import { formatNumber } from "../utils/utils";
import { GetMarketData, GetReferenceCurrencies } from "../utils/api/coinranking";
import { Sparklines, SparklinesLine } from "react-sparklines";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

import "../styles/converter.css";
import { useNavigate } from "react-router-dom";

const customUTCTime = () => {
    const d = new Date();
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return `${d.getUTCDate()} ${
        months[d.getUTCMonth()]
    }, ${d.getUTCHours()}:${d.getUTCMinutes()} UTC`;
};

const Converter = () => {
    const navigate = useNavigate();
    const [referenceCurrencyUuid, setReferenceCurrencyUuid] = useState("yhjMzLPhuIDl");

    const [coins, setCoins] = useState([]);
    const [referenceCurrencies, setReferenceCurrencies] = useState([]);

    const [fromCurrency, setFromCurrency] = useState(null);
    const [toCurrency, setToCurrency] = useState(null);

    const [fromCurrencyIdx, setFromCurrencyIdx] = useState(0);
    const [toCurrencyIdx, setToCurrencyIdx] = useState(0);

    const fromCurrencyRef = useRef();
    const toCurrencyRef = useRef();

    const [toggleFromCurrencyList, setToggleFromCurrencyList] = useState(false);
    const [toggleToCurrencyList, setToggleToCurrencyList] = useState(false);

    const getMarketData = Promise.resolve(GetMarketData(referenceCurrencyUuid, [], [], [], 100));
    const getReferenceCurrencies = Promise.resolve(GetReferenceCurrencies("fiat"));

    useEffect(() => {
        getMarketData.then((res) => {
            setFromCurrency(res.coins[fromCurrencyIdx]);
        });
    }, [fromCurrencyIdx, referenceCurrencyUuid]);

    useEffect(() => {
        if (toCurrencyRef.current) {
            toCurrencyRef.current.value = formatNumber(
                fromCurrency.price * fromCurrencyRef.current.value.replaceAll(",", "")
            );
        }
    }, [fromCurrency]);

    useEffect(() => {
        getMarketData.then((res) => {
            setFromCurrency(res.coins[0]);
            setCoins(res.coins);
        });
        getReferenceCurrencies.then((res) => {
            setToCurrency(res.currencies[0]);
            setReferenceCurrencies(res.currencies);
        });
    }, []);

    return (
        <>
            {fromCurrency && toCurrency && (
                <div className="container-converter-wrapper">
                    <div className="container-converter">
                        <div className="container-converter-content">
                            <div className="converter-content-item">
                                <div className="content-item-stats">
                                    <p>1 {fromCurrency.name} is equal to</p>
                                    <p>
                                        {formatNumber(fromCurrency.price)} {toCurrency.symbol}
                                    </p>
                                    <p>{customUTCTime()}</p>
                                </div>
                                <div className="content-item-selection">
                                    <div>
                                        <input
                                            className="selection-content-input"
                                            ref={fromCurrencyRef}
                                            type="text"
                                            defaultValue={"1.00"}
                                            onChange={(e) =>
                                                (toCurrencyRef.current.value = formatNumber(
                                                    fromCurrency.price *
                                                        e.target.value.replaceAll(",", "")
                                                ))
                                            }
                                            onFocus={(e) => {
                                                fromCurrencyRef.current.value = formatNumber(
                                                    e.target.value.replaceAll(",", "")
                                                ).replaceAll(",", "");
                                                fromCurrencyRef.current.type = "number";
                                            }}
                                            onBlur={(e) => {
                                                fromCurrencyRef.current.type = "text";
                                                fromCurrencyRef.current.value = formatNumber(
                                                    e.target.value.replaceAll(",", "")
                                                );
                                            }}
                                        />
                                        <div className="item-selection-content-wrapper">
                                            <button
                                                onClick={() => {
                                                    setToggleFromCurrencyList(
                                                        !toggleFromCurrencyList
                                                    );
                                                    setToggleToCurrencyList(false);
                                                }}
                                            >
                                                <div className="selection-content-row">
                                                    {fromCurrency.iconUrl ? (
                                                        <img src={fromCurrency.iconUrl} />
                                                    ) : (
                                                        <AttachMoneyIcon />
                                                    )}
                                                    <span>{fromCurrency.symbol}&nbsp;-&nbsp;</span>
                                                    <span>{fromCurrency.name}</span>
                                                </div>
                                                {toggleFromCurrencyList ? (
                                                    <CloseIcon />
                                                ) : (
                                                    <ExpandMoreIcon />
                                                )}
                                            </button>
                                            {toggleFromCurrencyList && (
                                                <div className="item-selection-content">
                                                    {coins?.map((coin, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="selection-content-row"
                                                            onClick={() => {
                                                                setFromCurrencyIdx(idx);
                                                                setFromCurrency(coin);
                                                                setToggleFromCurrencyList(false);
                                                            }}
                                                        >
                                                            {coin.iconUrl ? (
                                                                <img src={coin.iconUrl} />
                                                            ) : (
                                                                <AttachMoneyIcon />
                                                            )}
                                                            <span>{coin.symbol}&nbsp;-&nbsp;</span>
                                                            <span>{coin.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            className="selection-content-input"
                                            ref={toCurrencyRef}
                                            type="text"
                                            defaultValue={formatNumber(fromCurrency.price)}
                                            onChange={(e) =>
                                                (fromCurrencyRef.current.value = formatNumber(
                                                    e.target.value.replaceAll(",", "") /
                                                        fromCurrency.price
                                                ))
                                            }
                                            onFocus={(e) => {
                                                toCurrencyRef.current.value = formatNumber(
                                                    e.target.value.replaceAll(",", "")
                                                ).replaceAll(",", "");
                                                toCurrencyRef.current.type = "number";
                                            }}
                                            onBlur={(e) => {
                                                toCurrencyRef.current.type = "text";
                                                toCurrencyRef.current.value = formatNumber(
                                                    e.target.value.replaceAll(",", "")
                                                );
                                            }}
                                        />
                                        <div className="item-selection-content-wrapper">
                                            <button
                                                onClick={() => {
                                                    setToggleToCurrencyList(!toggleToCurrencyList);
                                                    setToggleFromCurrencyList(false);
                                                }}
                                            >
                                                <div className="selection-content-row">
                                                    {toCurrency.iconUrl ? (
                                                        <img src={toCurrency.iconUrl} />
                                                    ) : (
                                                        <AttachMoneyIcon />
                                                    )}
                                                    <span>{toCurrency.symbol}&nbsp;-&nbsp;</span>
                                                    <span>{toCurrency.name}</span>
                                                </div>
                                                {toggleToCurrencyList ? (
                                                    <CloseIcon />
                                                ) : (
                                                    <ExpandMoreIcon />
                                                )}
                                            </button>
                                            {toggleToCurrencyList && (
                                                <div className="item-selection-content">
                                                    {referenceCurrencies?.map((coin, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="selection-content-row"
                                                            onClick={() => {
                                                                setToCurrencyIdx(idx);
                                                                setToCurrency(coin);
                                                                setReferenceCurrencyUuid(coin.uuid);
                                                                setToggleToCurrencyList(false);
                                                            }}
                                                        >
                                                            {coin.iconUrl ? (
                                                                <img src={coin.iconUrl} />
                                                            ) : (
                                                                <AttachMoneyIcon />
                                                            )}
                                                            <span>{coin.symbol}&nbsp;-&nbsp;</span>
                                                            <span>{coin.name}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="converter-content-item">
                                <div>
                                    <p>
                                        24h {fromCurrency.name} to {toCurrency.symbol} chart
                                    </p>
                                    <div
                                        className="tag"
                                        onClick={() => navigate(`/coin/${fromCurrency.uuid}`)}
                                    >
                                        <p>Show detailed stats</p>
                                    </div>
                                </div>
                                <Sparklines data={fromCurrency.sparkline}>
                                    {fromCurrency.sparkline[0] <=
                                    fromCurrency.sparkline[fromCurrency.sparkline.length - 1] ? (
                                        <SparklinesLine color="#16c784" />
                                    ) : (
                                        <SparklinesLine color="#ea3943" />
                                    )}
                                </Sparklines>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Converter;
