import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";
import Cryptocurrencies from "./Cryptocurrencies";
import Exchanges from "./Exchanges";
import Converter from "./Converter";
import NFT from "./NFT";
import DeFi from "./DeFi";
import Coin from "./Coin";
import Carousel from "./Carousel";
import Trending from "./Trending";
import Title from "./Title";

import "../styles/app.css";

const App = () => {
    // let pageId = parseInt(useParams().pageId);
    // pageId = pageId ? pageId : 1;
    const [currentPage, setCurrentPage] = useState(1);
    const [stats, setStats] = useState();

    // useEffect(() => {
    // console.log(useParams().pageId);
    // }, [currentPage]);

    return (
        <>
            <div className="container">
                <Header stats={stats} setStats={setStats} setCurrentPage={setCurrentPage} />
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <Cryptocurrencies
                                currentPage={1}
                                setCurrentPage={{}}
                                link="cryptocurrencies"
                            />
                        }
                    />
                    <Route
                        exact
                        path="/cryptocurrencies/page=:pageId"
                        element={
                            <>
                                <Carousel />
                                <Title stats={stats?.totalMarketCap} />
                                <Trending stats={stats} />
                                <Cryptocurrencies
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    link="cryptocurrencies"
                                />
                            </>
                        }
                    />
                    <Route
                        exact
                        path="/exchanges/page=:pageId"
                        element={
                            <>
                                <Carousel />
                                <Exchanges
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                />
                            </>
                        }
                    />
                    <Route
                        exact
                        path="/nft/page=:pageId"
                        element={
                            <>
                                <Carousel />
                                <NFT
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    tags="nft"
                                    link="nft"
                                />
                            </>
                        }
                    />
                    <Route
                        exact
                        path="/defi/page=:pageId"
                        element={
                            <>
                                <Carousel />
                                <DeFi
                                    currentPage={currentPage}
                                    setCurrentPage={setCurrentPage}
                                    tags="defi"
                                    link="defi"
                                />
                            </>
                        }
                    />
                    <Route exact path="/converter" element={<Converter />} />
                    <Route exact path="/coin/:coinUuid" element={<Coin />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
};

export default App;
