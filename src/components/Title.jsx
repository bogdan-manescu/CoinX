import React from "react";

import { formatPrice } from "../utils/utils";

import "../styles/title.css";

const Title = ({ stats }) => {
    return (
        <div className="container-title-wrapper">
            <div className="container-title">
                <p>Today's Cryptocurrency Prices by Market Cap</p>
                <p className="container-subtitle">
                    The global cryptocurrency market cap is <span>{formatPrice(stats)}</span>
                </p>
            </div>
        </div>
    );
};

export default Title;
