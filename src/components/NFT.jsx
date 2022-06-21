import React from "react";

import Cryptocurrencies from "./Cryptocurrencies";

const NFT = ({ currentPage, setCurrentPage }) => {
    return (
        <Cryptocurrencies
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            tags="nft"
            link="nft"
        />
    );
};

export default NFT;
