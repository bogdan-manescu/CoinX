import React from "react";

import Cryptocurrencies from "./Cryptocurrencies";

const DeFi = ({ currentPage, setCurrentPage }) => {
    return (
        <Cryptocurrencies
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            tags="defi"
            link="defi"
        />
    );
};

export default DeFi;
