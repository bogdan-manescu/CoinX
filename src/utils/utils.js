import { useState, useEffect } from "react";

export const formatPrice = (price) => {
    let format;

    if (price >= 1000000) {
        format = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
    } else if (price < 1000000 && price >= 1) {
        format = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    } else if (price < 1 && price >= 0.0001) {
        format = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 4,
            maximumFractionDigits: 4,
        });
    } else {
        format = Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 8,
            maximumFractionDigits: 8,
        });
    }

    return format.format(price);
};

export const formatNumber = (number, decimals = -1) => {
    let format;

    if (decimals >= 0) {
        format = Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });
    } else {
        if (number >= 1000000) {
            format = Intl.NumberFormat("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            });
        } else if (number < 1000000 && number >= 1) {
            format = Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            });
        } else if (number < 1 && number >= 0.0001) {
            format = Intl.NumberFormat("en-US", {
                minimumFractionDigits: 4,
                maximumFractionDigits: 4,
            });
        } else {
            format = Intl.NumberFormat("en-US", {
                minimumFractionDigits: 8,
                maximumFractionDigits: 8,
            });
        }
    }

    return format.format(number);
};

const windowInnerDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
};

export const SortTable = (item, orderBy, orderDirection) => {
    const compare = (a, b) => {
        if (orderDirection === "asc") {
            if (orderBy === "name") {
                return a.name.localeCompare(b.name);
            } else {
                return parseFloat(a[`${orderBy}`]) - parseFloat(b[`${orderBy}`]);
            }
        } else {
            if (orderBy === "name") {
                return -a.name.localeCompare(b.name);
            } else {
                return -(parseFloat(a[`${orderBy}`]) - parseFloat(b[`${orderBy}`]));
            }
        }
    };

    return item?.sort((a, b) => compare(a, b));
};

export const GetWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(windowInnerDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(windowInnerDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
};

export const newsMockup = Array.from({ length: 10 }).fill({
    provider: [{ name: "source.com" }],
    name: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, accusantium. Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, accusantium.",
    url: "https://www.google.com/",
});
