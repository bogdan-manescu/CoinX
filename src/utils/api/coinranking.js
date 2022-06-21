const axios = require("axios");

const headers = {
    "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_API_KEY,
};

export const GetMarketData = (
    referenceCurrencyUuid,
    timePeriod,
    orderBy,
    orderDirection,
    limit,
    offset,
    tags
) => {
    const options = {
        method: "GET",
        url: "https://coinranking1.p.rapidapi.com/coins",
        params: {
            referenceCurrencyUuid: referenceCurrencyUuid,
            timePeriod: timePeriod,
            orderBy: orderBy,
            orderDirection: orderDirection,
            limit: limit,
            offset: offset,
            "tags[0]": tags,
        },
        headers: headers,
    };

    return axios
        .request(options)
        .then((res) => res.data.data)
        .catch((err) => console.log(err));
};

export const GetCoinData = (uuid, referenceCurrencyUuid, timePeriod) => {
    const options = {
        method: "GET",
        url: `https://coinranking1.p.rapidapi.com/coin/${uuid}`,
        params: { referenceCurrencyUuid: referenceCurrencyUuid, timePeriod: timePeriod },
        headers: headers,
    };

    return axios
        .request(options)
        .then((res) => res.data.data.coin)
        .catch((err) => console.log(err));
};

export const GetCoinHistory = (uuid, referenceCurrencyUuid, timePeriod) => {
    const options = {
        method: "GET",
        url: `https://coinranking1.p.rapidapi.com/coin/${uuid}/history`,
        params: { referenceCurrencyUuid: referenceCurrencyUuid, timePeriod: timePeriod },
        headers: headers,
    };

    return axios
        .request(options)
        .then((res) => res.data.data)
        .catch((err) => console.log(err));
};

export const GetCoinSupply = (uuid) => {
    const options = {
        method: "GET",
        url: `https://coinranking1.p.rapidapi.com/coin/${uuid}/supply`,
        headers: headers,
    };

    return axios
        .request(options)
        .then((res) => res.data.data)
        .catch((err) => console.log(err));
};

export const GetReferenceCurrencies = (type) => {
    const options = {
        method: "GET",
        url: "https://coinranking1.p.rapidapi.com/reference-currencies",
        params: { "types[0]": type, limit: "100", offset: "0" },
        headers: headers,
    };

    return axios
        .request(options)
        .then((res) => res.data.data)
        .catch((err) => console.log(err));
};

export const GetGlobalData = (referenceCurrencyUuid) => {
    const options = {
        method: "GET",
        url: "https://coinranking1.p.rapidapi.com/stats",
        params: { referenceCurrencyUuid: referenceCurrencyUuid },
        headers: headers,
    };

    return axios
        .request(options)
        .then((res) => res.data.data)
        .catch((err) => console.log(err));
};

export const GetExchangesData = (referenceCurrencyUuid, orderBy, orderDirection, limit, offset) => {
    const options = {
        method: "GET",
        url: "https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/exchanges",
        params: {
            referenceCurrencyUuid: referenceCurrencyUuid,
            orderBy: orderBy,
            orderDirection: orderDirection,
            limit: limit,
            offset: offset,
        },
        headers: headers,
    };

    return axios
        .request(options)
        .then((res) => res.data.data)
        .catch((err) => console.log(err));
};
