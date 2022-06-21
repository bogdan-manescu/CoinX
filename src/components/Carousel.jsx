import React, { useState, useEffect, useRef } from "react";

import { GetNewsData } from "../utils/api/bing";
// import { newsMockup } from "../utils/utils";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";

import "../styles/carousel.css";

const scrollCarousel = (carousel, amount, step, speed) => {
    let currentScrollAmount = 0;

    const interval = setInterval(() => {
        carousel.current.scrollLeft += step;
        currentScrollAmount += Math.abs(step);

        if (currentScrollAmount >= amount) {
            clearInterval(interval);
        }
    }, speed);
};

const Carousel = () => {
    const carousel = useRef(null);

    const [showArrows, setShowArrows] = useState({ left: 0, right: 1 });

    const [news, setNews] = useState();

    useEffect(() => {
        Promise.resolve(GetNewsData()).then((res) => setNews(res));
    }, []);

    return (
        <div className="container-carousel">
            <div className="carousel-items-wrapper">
                <div
                    className={showArrows.left ? "carousel-arrow-prev show" : "carousel-arrow-prev"}
                    onClick={() => {
                        scrollCarousel(carousel, 300, -5, 1);
                    }}
                >
                    <ArrowBackIosNewIcon color="action" />
                </div>
                <div
                    className="carousel-items"
                    ref={carousel}
                    onScroll={(e) => {
                        let leftPos = e.target.getBoundingClientRect().width;
                        let rightPos = 3234.7;
                        let pos = leftPos + e.target.scrollLeft;

                        if (pos <= leftPos) {
                            setShowArrows({ left: 0, right: 1 });
                        } else if (pos >= rightPos) {
                            setShowArrows({ left: 1, right: 0 });
                        } else if (!showArrows.left || !showArrows.right) {
                            setShowArrows({ left: 1, right: 1 });
                        }
                    }}
                >
                    {news?.map((item, idx) => (
                        <a
                            key={idx}
                            className="carousel-item"
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {item.image?.thumbnail?.contentUrl ? (
                                <img src={item.image.thumbnail.contentUrl} />
                            ) : (
                                <ImageNotSupportedIcon
                                    color="disabled"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <div>
                                <div>
                                    {item.provider[0]?.image?.thumbnail?.contentUrl ? (
                                        <img src={item.provider[0].image.thumbnail.contentUrl} />
                                    ) : (
                                        <ImageNotSupportedIcon
                                            color="disabled"
                                            style={{ width: "16px", height: "16px" }}
                                        />
                                    )}
                                    <p>{item.provider[0].name}</p>
                                </div>
                                <p>
                                    {item.name.length <= 75
                                        ? item.name
                                        : `${item.name.substring(0, 75)}...`}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
                <div
                    className={
                        showArrows.right ? "carousel-arrow-next show" : "carousel-arrow-next"
                    }
                    onClick={() => {
                        scrollCarousel(carousel, 350, 5, 1);
                    }}
                >
                    <ArrowForwardIosIcon color="action" />
                </div>
            </div>
        </div>
    );
};

export default Carousel;
