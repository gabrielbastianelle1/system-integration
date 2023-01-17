import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Langpage from "./components/landpage/Landpage";
import Order from "./components/orderByCountry/Order";
import Score from "./components/score/Score";
import Rating from "./components/rating/Rating";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route exact path={"/"} element={<Langpage />}></Route>
                    <Route exact path={"/order"} element={<Order />}></Route>
                    <Route exact path={"/score"} element={<Score />}></Route>
                    <Route exact path={"/rating"} element={<Rating />}></Route>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
