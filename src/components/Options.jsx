import React, { useState } from "react";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import "../styles/options.css";

const Options = ({ setCurrentPage, pageSize, setPageSize }) => {
    const [toggleRows, setToggleRows] = useState(false);

    const onShowRowsClick = (pageSize) => {
        setPageSize(pageSize);
        setToggleRows(false);
        setCurrentPage(1);
    };

    return (
        <div className="container-options">
            <div className="options-show-rows">
                <p>Show rows</p>
                <div className="options-show-rows-content-wrapper">
                    <button
                        className="page icon-wrapper active"
                        onClick={() => setToggleRows(!toggleRows)}
                    >
                        <p style={{ fontWeight: "bold" }}>&nbsp;{pageSize}</p>
                        <KeyboardArrowDownIcon />
                    </button>
                    {toggleRows && (
                        <div className="options-show-rows-content">
                            <div className="options-show-rows-content-item">
                                <button
                                    className="page icon-wrapper"
                                    onClick={() => onShowRowsClick(20)}
                                >
                                    20
                                </button>
                            </div>
                            <div className="options-show-rows-content-item">
                                <button
                                    className="page icon-wrapper"
                                    onClick={() => onShowRowsClick(50)}
                                >
                                    50
                                </button>
                            </div>
                            <div className="options-show-rows-content-item">
                                <button
                                    className="page icon-wrapper"
                                    onClick={() => onShowRowsClick(100)}
                                >
                                    100
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Options;
