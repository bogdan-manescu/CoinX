import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { GetMarketData } from "../utils/api/coinranking";
import { GetWindowDimensions, formatPrice, formatNumber, SortTable } from "../utils/utils";
import { Sparklines, SparklinesLine } from "react-sparklines";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import Pagination from "./Pagination";
import Options from "./Options";

import "../styles/table.css";

const Cryptocurrencies = ({ currentPage, setCurrentPage, tags, link }) => {
    // let pageId = parseInt(useParams().pageId);
    // pageId = pageId ? pageId : 1;
    // const [currentPage, setCurrentPage] = useState(pageId);

    const orderBy = {
        rank: "rank",
        name: "name",
        price: "price",
        change: "change",
        marketCap: "marketCap",
        dailyVolume: "24hVolume",
    };
    const orderDirection = {
        ascending: "asc",
        descending: "desc",
    };

    const { width } = GetWindowDimensions();
    const navigate = useNavigate();

    const [stats, setStats] = useState();
    const [coins, setCoins] = useState();

    const [coinsOrderBy, setCoinsOrderBy] = useState(orderBy.marketCap);
    const [coinsOrderDirection, setCoinsOrderDirection] = useState(orderDirection.descending);

    const [pageSize, setPageSize] = useState(20);
    const offset = pageSize * (currentPage - 1);
    const pageCount = Math.ceil(stats?.totalCoins / pageSize);

    const getMarketDataPromise = Promise.resolve(
        GetMarketData([], [], [], [], pageSize, offset, tags)
    );

    useEffect(() => {
        getMarketDataPromise.then((res) => {
            setCoins(res.coins);
            setStats(res.stats);
        });

        navigate(`/${link}/page=${currentPage}`);

        setCoinsOrderBy(orderBy.marketCap);
        setCoinsOrderDirection(orderDirection.descending);

        window.scrollTo(0, 0);
    }, [currentPage, pageSize]);

    useMemo(() => {
        SortTable(coins, coinsOrderBy, coinsOrderDirection);
    }, [coinsOrderBy, coinsOrderDirection, coins]);

    return (
        <div className="container-body-wrapper">
            <Options
                setCurrentPage={setCurrentPage}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
            <table className="container-table">
                <thead className="container-table-head">
                    <tr>
                        <th>
                            <div>
                                <div
                                    className="table-head-item-wrapper"
                                    onClick={() => {
                                        setCoinsOrderBy(orderBy.rank);
                                        coinsOrderDirection === orderDirection.ascending
                                            ? setCoinsOrderDirection(orderDirection.descending)
                                            : setCoinsOrderDirection(orderDirection.ascending);
                                    }}
                                >
                                    <p>#</p>
                                    {coinsOrderBy === orderBy.rank ? (
                                        coinsOrderDirection === orderDirection.ascending ? (
                                            <ArrowDropUpIcon />
                                        ) : (
                                            <ArrowDropDownIcon />
                                        )
                                    ) : (
                                        <div className="arrow-replacement" />
                                    )}
                                </div>
                            </div>
                        </th>
                        <th>
                            <div>
                                <div
                                    className="table-head-item-wrapper"
                                    onClick={() => {
                                        setCoinsOrderBy(orderBy.name);
                                        coinsOrderDirection === orderDirection.ascending
                                            ? setCoinsOrderDirection(orderDirection.descending)
                                            : setCoinsOrderDirection(orderDirection.ascending);
                                    }}
                                >
                                    <p>Name</p>
                                    {coinsOrderBy === orderBy.name ? (
                                        coinsOrderDirection === orderDirection.ascending ? (
                                            <ArrowDropUpIcon />
                                        ) : (
                                            <ArrowDropDownIcon />
                                        )
                                    ) : (
                                        <div className="arrow-replacement" />
                                    )}
                                </div>
                            </div>
                        </th>
                        <th>
                            <div>
                                <div
                                    className="table-head-item-wrapper"
                                    onClick={() => {
                                        setCoinsOrderBy(orderBy.price);
                                        coinsOrderDirection === orderDirection.ascending
                                            ? setCoinsOrderDirection(orderDirection.descending)
                                            : setCoinsOrderDirection(orderDirection.ascending);
                                    }}
                                >
                                    {coinsOrderBy === orderBy.price ? (
                                        coinsOrderDirection === orderDirection.ascending ? (
                                            <ArrowDropUpIcon />
                                        ) : (
                                            <ArrowDropDownIcon />
                                        )
                                    ) : (
                                        <div className="arrow-replacement" />
                                    )}
                                    <p>Price</p>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div>
                                <div
                                    className="table-head-item-wrapper"
                                    onClick={() => {
                                        setCoinsOrderBy(orderBy.change);

                                        coinsOrderDirection === orderDirection.ascending
                                            ? setCoinsOrderDirection(orderDirection.descending)
                                            : setCoinsOrderDirection(orderDirection.ascending);
                                    }}
                                >
                                    {coinsOrderBy === orderBy.change ? (
                                        coinsOrderDirection === orderDirection.ascending ? (
                                            <ArrowDropUpIcon />
                                        ) : (
                                            <ArrowDropDownIcon />
                                        )
                                    ) : (
                                        <div className="arrow-replacement" />
                                    )}
                                    <p>24h%</p>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div>
                                <div
                                    className="table-head-item-wrapper"
                                    onClick={() => {
                                        setCoinsOrderBy(orderBy.marketCap);

                                        coinsOrderDirection === orderDirection.ascending
                                            ? setCoinsOrderDirection(orderDirection.descending)
                                            : setCoinsOrderDirection(orderDirection.ascending);
                                    }}
                                >
                                    {coinsOrderBy === orderBy.marketCap ? (
                                        coinsOrderDirection === orderDirection.ascending ? (
                                            <ArrowDropUpIcon />
                                        ) : (
                                            <ArrowDropDownIcon />
                                        )
                                    ) : (
                                        <div className="arrow-replacement" />
                                    )}
                                    <p>Market Cap</p>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div>
                                <div
                                    className="table-head-item-wrapper"
                                    onClick={() => {
                                        setCoinsOrderBy(orderBy.dailyVolume);

                                        coinsOrderDirection === orderDirection.ascending
                                            ? setCoinsOrderDirection(orderDirection.descending)
                                            : setCoinsOrderDirection(orderDirection.ascending);
                                    }}
                                >
                                    {coinsOrderBy === orderBy.dailyVolume ? (
                                        coinsOrderDirection === orderDirection.ascending ? (
                                            <ArrowDropUpIcon />
                                        ) : (
                                            <ArrowDropDownIcon />
                                        )
                                    ) : (
                                        <div className="arrow-replacement" />
                                    )}
                                    <p>Volume(24h)</p>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div>
                                <p>Last 24 hours</p>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="container-table-body">
                    {coins?.map((coin, id) => (
                        <tr
                            key={id}
                            onClick={() => navigate(`/coin/${coin.uuid}`)}
                            className="hoverable"
                        >
                            <td>
                                <div>
                                    <p>{coin.rank}</p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    {width > 700 ? (
                                        <>
                                            <img
                                                src={coin.iconUrl}
                                                alt={coin.name}
                                                style={{ width: "24px", height: "24px" }}
                                            />
                                            <div>
                                                <p>{coin.name}</p>
                                                <p>{coin.symbol}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <img
                                                src={coin.iconUrl}
                                                alt={coin.name}
                                                style={{ width: "24px" }}
                                            />
                                            <div>
                                                <p>{coin.name}</p>
                                                <div>
                                                    <p>{coin.rank}</p>
                                                    <p>{coin.symbol}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </td>
                            <td>
                                <div>
                                    <p>{formatPrice(coin.price)}</p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    {coin.change < 0 ? (
                                        <>
                                            <ArrowDropDownIcon className="price-change-down" />
                                            <p className="price-change-down">{-coin.change}%</p>
                                        </>
                                    ) : (
                                        <>
                                            <ArrowDropUpIcon className="price-change-up" />
                                            <p className="price-change-up">{coin.change}%</p>
                                        </>
                                    )}
                                </div>
                            </td>
                            <td>
                                <div>
                                    <p>{formatPrice(coin.marketCap)}</p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <p>{formatPrice(coin["24hVolume"])}</p>
                                    <p>
                                        {formatNumber(coin["24hVolume"] / coin.price)} {coin.symbol}
                                    </p>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <Sparklines data={coin.sparkline} width={100} height={50}>
                                        {coin.sparkline[0] <=
                                        coin.sparkline[coin.sparkline.length - 1] ? (
                                            <SparklinesLine color="#16c784" />
                                        ) : (
                                            <SparklinesLine color="#ea3943" />
                                        )}
                                    </Sparklines>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                pageCount={pageCount}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default Cryptocurrencies;
