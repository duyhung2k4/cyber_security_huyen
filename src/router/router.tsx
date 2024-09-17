import React from "react";
import { ROUTER_APP } from "@/constant/router";
import { Route, Routes } from "react-router-dom";
import { PageAffine, PageCaesarCipher, PageTh1 } from "./lazy";



const RouterApp: React.FC = () => {
    return (
        <Routes>
            <Route path={ROUTER_APP.TH1.href} element={<PageTh1/>} />
            <Route path={ROUTER_APP.AFFINE.href} element={<PageAffine/>} />
            <Route path={ROUTER_APP.CAESAR_CIPHER.href} element={<PageCaesarCipher/>} />
        </Routes>
    )
}

export default RouterApp;