import { BrowserRouter } from "react-router-dom";
import NavigationLayout from "./NavigationLayout";
import React from "react";
import "antd/dist/antd.css";
import "../Css/NavigationLayout.css";

export default function NavigationLayoutFather(){
    return(
        <BrowserRouter><NavigationLayout/></BrowserRouter>
    )        
}

