import React from "react";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import "../styles/trending.css";

const Trending = ({ stats }) => {
    return (
        <div className="container-trending-wrapper">
            <div className="container-trending">
                <div className="trending-wrapper">
                    <div className="trending">
                        <div className="trending-title">
                            <LocalFireDepartmentIcon style={{ color: "red" }} fontSize="large" />
                            <p>Trending</p>
                        </div>
                        <div className="trending-content">
                            {stats?.bestCoins.map((coin, id) => (
                                <div key={id} className="trending-content-item">
                                    <p style={{ minWidth: "10px" }}>{id + 1}</p>
                                    <img
                                        style={{ width: "24px", height: "100%" }}
                                        src={coin.iconUrl}
                                        alt={coin.name}
                                    />
                                    <p>{coin.name}</p>
                                    <p>{coin.symbol}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="trending-wrapper">
                    <div className="trending"></div>
                    <div className="trending-title">
                        <AccessTimeIcon color="action" fontSize="large" />
                        <p>Recently Added</p>
                    </div>
                    <div className="trending-content">
                        {stats?.newestCoins.map((coin, id) => (
                            <div key={id} className="trending-content-item">
                                <p style={{ minWidth: "10px" }}>{id + 1}</p>
                                <img
                                    style={{ width: "24px", height: "100%" }}
                                    src={coin.iconUrl}
                                    alt={coin.name}
                                />
                                <p>{coin.name}</p>
                                <p>{coin.symbol}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trending;
