const axios = require("axios");

const headers = {
    "X-BingApis-SDK": "true",
    "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_API_KEY,
};

export const GetNewsData = () => {
    const options = {
        method: "GET",
        url: "https://bing-news-search1.p.rapidapi.com/news/search",
        params: {
            q: "crypto, cryptocurrency, bitcoin, nft",
            freshness: "Day",
            textFormat: "Raw",
            safeSearch: "Off",
        },
        headers: headers,
    };

    return axios
        .request(options)
        .then((res) => res.data.value)
        .catch((err) => console.log(err));
};
