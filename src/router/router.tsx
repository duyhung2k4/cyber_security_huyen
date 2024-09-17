import React, { Suspense } from "react";
import { ROUTER_APP } from "@/constant/router";
import { Route, Routes } from "react-router-dom";
import { PageAffine, PageCaesarCipher, PageSubstitutionCipher, PageHome } from "./lazy";
import { LoadingOverlay } from "@mantine/core";



const RouterApp: React.FC = () => {
    return (
        <Suspense fallback={<LoadingOverlay visible overlayProps={{ radius: "sm", blur: 2 }} />}>
            <Routes>
                <Route path={ROUTER_APP.HOME.href} element={<PageHome />} />
                <Route path={ROUTER_APP.AFFINE.href} element={<PageAffine />} />
                <Route path={ROUTER_APP.CAESAR_CIPHER.href} element={<PageCaesarCipher />} />
                <Route path={ROUTER_APP.SUBSTITUTION_CIPHER.href} element={<PageSubstitutionCipher />} />
            </Routes>
        </Suspense>
    )
}

export default RouterApp;