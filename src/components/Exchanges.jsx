import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { GetExchangesData } from "../utils/api/coinranking";
import { GetWindowDimensions, formatPrice, formatNumber, SortTable } from "../utils/utils";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

import Pagination from "./Pagination";
import Options from "./Options";

import "../styles/table.css";

const Exchanges = ({ currentPage, setCurrentPage }) => {
    // let pageId = parseInt(useParams().pageId);
    // pageId = pageId ? pageId : 1;
    // const [currentPage, setCurrentPage] = useState(pageId);

    const orderBy = {
        rank: "rank",
        name: "name",
        numberOfMarkets: "numberOfMarkets",
        btcPrice: "btcPrice",
        dailyVolume: "24hVolume",
        recommended: "recommended",
    };
    const orderDirection = {
        ascending: "asc",
        descending: "desc",
    };

    const { width } = GetWindowDimensions();
    const navigate = useNavigate();

    const [stats, setStats] = useState();
    const [exchanges, setExchanges] = useState();

    const [exchangesOrderBy, setExchangesOrderBy] = useState(orderBy.rank);
    const [exchangesOrderDirection, setExchangesOrderDirection] = useState(
        orderDirection.ascending
    );

    const [pageSize, setPageSize] = useState(20);
    const offset = pageSize * (currentPage - 1);
    const pageCount = Math.ceil(stats?.total / pageSize);

    const getExchangesData = Promise.resolve(GetExchangesData([], [], [], pageSize, offset));

    useEffect(() => {
        getExchangesData.then((res) => {
            setExchanges(res.exchanges);
            setStats(res.stats);
        });

        navigate(`/exchanges/page=${currentPage}`);

        setExchangesOrderBy(orderBy.rank);
        setExchangesOrderDirection(orderDirection.ascending);

        window.scrollTo(0, 0);
    }, [currentPage, pageSize]);

    useMemo(() => {
        SortTable(exchanges, exchangesOrderBy, exchangesOrderDirection);
    }, [exchangesOrderBy, exchangesOrderDirection, exchanges]);

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
                                        setExchangesOrderBy(orderBy.rank);
                                        exchangesOrderDirection === orderDirection.ascending
                                            ? setExchangesOrderDirection(orderDirection.descending)
                                            : setExchangesOrderDirection(orderDirection.ascending);
                                    }}
                                >
                                    <p>#</p>
                                    {exchangesOrderBy === orderBy.rank ? (
                                        exchangesOrderDirection === orderDirection.ascending ? (
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
                                        setExchangesOrderBy(orderBy.name);
                                        exchangesOrderDirection === orderDirection.ascending
                                            ? setExchangesOrderDirection(orderDirection.descending)
                                            : setExchangesOrderDirection(orderDirection.ascending);
                                    }}
                                >
                                    <p>Name</p>
                                    {exchangesOrderBy === orderBy.name ? (
                                        exchangesOrderDirection === orderDirection.ascending ? (
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
                                        setExchangesOrderBy(orderBy.dailyVolume);
                                        exchangesOrderDirection === orderDirection.ascending
                                            ? setExchangesOrderDirection(orderDirection.descending)
                                            : setExchangesOrderDirection(orderDirection.ascending);
                                    }}
                                >
                                    {exchangesOrderBy === orderBy.dailyVolume ? (
                                        exchangesOrderDirection === orderDirection.ascending ? (
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
                                <div
                                    className="table-head-item-wrapper"
                                    onClick={() => {
                                        setExchangesOrderBy(orderBy.numberOfMarkets);
                                        exchangesOrderDirection === orderDirection.ascending
                                            ? setExchangesOrderDirection(orderDirection.descending)
                                            : setExchangesOrderDirection(orderDirection.ascending);
                                    }}
                                >
                                    {exchangesOrderBy === orderBy.numberOfMarkets ? (
                                        exchangesOrderDirection === orderDirection.ascending ? (
                                            <ArrowDropUpIcon />
                                        ) : (
                                            <ArrowDropDownIcon />
                                        )
                                    ) : (
                                        <div className="arrow-replacement" />
                                    )}
                                    <p># Markets</p>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div>
                                <div
                                    className="table-head-item-wrapper"
                                    onClick={() => {
                                        setExchangesOrderBy(orderBy.btcPrice);
                                        exchangesOrderDirection === orderDirection.ascending
                                            ? setExchangesOrderDirection(orderDirection.descending)
                                            : setExchangesOrderDirection(orderDirection.ascending);
                                    }}
                                >
                                    {exchangesOrderBy === orderBy.btcPrice ? (
                                        exchangesOrderDirection === orderDirection.ascending ? (
                                            <ArrowDropUpIcon />
                                        ) : (
                                            <ArrowDropDownIcon />
                                        )
                                    ) : (
                                        <div className="arrow-replacement" />
                                    )}
                                    <p>BTC Price</p>
                                </div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="container-table-body">
                    {exchanges?.map((exchange, id) => (
                        <tr key={id}>
                            <td style={{ paddingBlock: "20px" }}>
                                <div>
                                    <p>{exchange.rank}</p>
                                </div>
                            </td>
                            <td style={{ paddingBlock: "20px" }}>
                                <div>
                                    {width > 700 ? (
                                        <>
                                            <img
                                                src={exchange.iconUrl}
                                                alt={exchange.name}
                                                style={{ width: "24px", height: "24px" }}
                                            />
                                            <div>
                                                <p>{exchange.name}</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <img
                                                src={exchange.iconUrl}
                                                alt={exchange.name}
                                                style={{ width: "24px" }}
                                            />
                                            <div>
                                                <p>{exchange.name}</p>
                                                <div>
                                                    <p>{exchange.rank}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </td>
                            <td style={{ paddingBlock: "20px" }}>
                                <div>
                                    <p>{formatPrice(exchange["24hVolume"])}</p>
                                </div>
                            </td>
                            <td style={{ paddingBlock: "20px" }}>
                                <div>
                                    <p>{exchange.numberOfMarkets}</p>
                                </div>
                            </td>
                            <td style={{ paddingBlock: "20px" }}>
                                <div>
                                    <p>{formatNumber(exchange.btcPrice, 8)} BTC</p>
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

export default Exchanges;
