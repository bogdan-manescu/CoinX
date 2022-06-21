import React, { useState, useEffect } from "react";

import { GetWindowDimensions } from "../utils/utils";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import "../styles/pagination.css";

const makePaginationArray = (pageCount, currentPage, siblingCount) => {
    const makeArrayRange = (from, to) => {
        const length = to - from + 1;
        return Array.from({ length: length }, (_, idx) => idx + from);
    };

    const totalPagesToDisplay = siblingCount + 5;
    const leftmostSibling = currentPage - siblingCount <= 1 ? 1 : currentPage - siblingCount;
    const rightmostSibling =
        currentPage + siblingCount >= pageCount ? pageCount : currentPage + siblingCount;
    const displayLeftDots = leftmostSibling >= 3;
    const displayRightDots = rightmostSibling <= pageCount - 2;
    const minPagesToDisplay = 3 + 2 * siblingCount;

    if (pageCount <= totalPagesToDisplay) {
        return makeArrayRange(1, pageCount);
    } else if (!displayLeftDots && displayRightDots) {
        return [...makeArrayRange(1, minPagesToDisplay), -1, pageCount];
    } else if (displayLeftDots && !displayRightDots) {
        return [1, -1, ...makeArrayRange(pageCount - minPagesToDisplay + 1, pageCount)];
    } else if (displayLeftDots && displayRightDots) {
        return [1, -1, ...makeArrayRange(leftmostSibling, rightmostSibling), -1, pageCount];
    }
};

const Pagination = ({ pageCount, currentPage, setCurrentPage }) => {
    const { width } = GetWindowDimensions();

    const [siblingCount, setSiblingCount] = useState(2);
    const pagination = makePaginationArray(pageCount, currentPage, siblingCount);

    useEffect(() => {
        if (width <= 550) {
            setSiblingCount(1);
        } else {
            setSiblingCount(2);
        }
    }, [width]);

    return (
        <div className="container-pagination">
            <div className="container-pagination-body">
                <button
                    className="icon-wrapper chevron"
                    onClick={() => setCurrentPage(currentPage <= 1 ? 1 : currentPage - 1)}
                >
                    <ChevronLeftRoundedIcon />
                </button>
                {pagination?.map((page, id) =>
                    page !== -1 ? (
                        <button
                            key={id}
                            className={
                                currentPage === page
                                    ? "page icon-wrapper active"
                                    : "page icon-wrapper"
                            }
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ) : (
                        <button key={id} className={"icon-wrapper dots"}>
                            <MoreHorizIcon />
                        </button>
                    )
                )}
                <button
                    className="icon-wrapper chevron"
                    onClick={() =>
                        setCurrentPage(currentPage >= pageCount ? pageCount : currentPage + 1)
                    }
                >
                    <ChevronRightRoundedIcon />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
