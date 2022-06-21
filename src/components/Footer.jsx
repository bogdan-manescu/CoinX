import React from "react";

import logo from "../images/coinxlogo2.png";

import InstagramIcon from "@mui/icons-material/Instagram";

import "../styles/footer.css";

const Footer = () => {
    return (
        <div className="container-footer-wrapper">
            <div className="container-footer">
                <img style={{ width: "80px", height: "100%" }} src={logo} alt="logo" />
                <p>© 2022 CoinX. All rights reserved.</p>
                <div className="container-footer-mention">
                    <InstagramIcon style={{ width: "20px", height: "20px", lineHeight: 0 }} />
                    <p>bogdanmanescu_</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
