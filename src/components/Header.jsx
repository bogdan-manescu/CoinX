import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { GetGlobalData } from "../utils/api/coinranking";
import { formatPrice, formatNumber } from "../utils/utils";

import logo from "../images/coinxlogo2.png";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import "../styles/header.css";

const Header = ({ stats, setStats, setCurrentPage }) => {
    const navigate = useNavigate();

    const [toggleMenu, setToggleMenu] = useState(false);
    const [path, setPath] = useState(window.location.pathname.split("/")[1] || "cryptocurrencies");

    // const [stats, setStats] = useState();
    const getGlobalDataPromise = Promise.resolve(GetGlobalData());

    useEffect(() => {
        getGlobalDataPromise.then((res) => setStats(res));
    }, []);

    const NavigationButton = ({ value, navigateTo }) => {
        const pathName = value.toLowerCase();

        return (
            <button
                className={path === pathName ? "page icon-wrapper active" : "page icon-wrapper"}
                onClick={() => {
                    setCurrentPage(1);
                    navigate(navigateTo);
                    setPath(pathName);
                }}
            >
                &nbsp;{value}&nbsp;
            </button>
        );
    };

    return (
        <div className="container-header-wrapper">
            <div className="container-badge">
                <div className="badge-items">
                    <div className="badge-item">
                        <p>
                            Cryptocurrencies:&nbsp;<span>{formatNumber(stats?.totalCoins, 0)}</span>
                        </p>
                    </div>
                    <div className="badge-item">
                        <p>
                            Markets:&nbsp;<span>{formatNumber(stats?.totalMarkets, 0)}</span>
                        </p>
                    </div>
                    <div className="badge-item">
                        <p>
                            Exchanges:&nbsp;<span>{formatNumber(stats?.totalExchanges, 0)}</span>
                        </p>
                    </div>
                    <div className="badge-item">
                        <p>
                            Market Cap:&nbsp;<span>{formatPrice(stats?.totalMarketCap)}</span>
                        </p>
                    </div>
                    <div className="badge-item">
                        <p>
                            24h Volume:&nbsp;<span>{formatPrice(stats?.total24hVolume)}</span>
                        </p>
                    </div>
                    <div className="badge-item">
                        <p>
                            BTC Dominance:&nbsp;<span>{formatNumber(stats?.btcDominance)}%</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="container-navbar">
                <div className="navbar-items-wrapper">
                    <img
                        style={{ width: "130px" }}
                        src={logo}
                        alt="logo"
                        onClick={() => {
                            setCurrentPage(1);
                            navigate("/cryptocurrencies/page=1");
                            setPath("cryptocurrencies");
                        }}
                    />
                    <div className="navbar-items">
                        <NavigationButton
                            value="Cryptocurrencies"
                            navigateTo="/cryptocurrencies/page=1"
                        />
                        <NavigationButton value="Exchanges" navigateTo="/exchanges/page=1" />
                        <NavigationButton value="NFT" navigateTo="/nft/page=1" />
                        <NavigationButton value="DeFi" navigateTo="/defi/page=1" />
                        <NavigationButton value="Converter" navigateTo="/converter" />
                    </div>
                    <div className="navbar-items-menu-content-wrapper">
                        <div onClick={() => setToggleMenu(!toggleMenu)}>
                            {!toggleMenu ? (
                                <MenuIcon />
                            ) : (
                                <>
                                    <CloseIcon />
                                    <div className="navbar-items-menu-content show">
                                        <div className="navbar-items-menu-content-item">
                                            <NavigationButton
                                                value="Cryptocurrencies"
                                                navigateTo="/cryptocurrencies/page=1"
                                            />
                                        </div>
                                        <div className="navbar-items-menu-content-item">
                                            <NavigationButton
                                                value="Exchanges"
                                                navigateTo="/exchanges/page=1"
                                            />
                                        </div>
                                        <div className="navbar-items-menu-content-item">
                                            <NavigationButton
                                                value="NFT"
                                                navigateTo="/nft/page=1"
                                            />
                                        </div>
                                        <div className="navbar-items-menu-content-item">
                                            <NavigationButton
                                                value="DeFi"
                                                navigateTo="/defi/page=1"
                                            />
                                        </div>
                                        <div className="navbar-items-menu-content-item">
                                            <NavigationButton
                                                value="Converter"
                                                navigateTo="/converter"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
