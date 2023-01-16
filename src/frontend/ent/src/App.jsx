import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from "./components/layout/Layout";
import Cities from "./components/cities/Cities"
import Movies from './components/movies/Movies';
import AddMovie from './components/addmovie/AddMovie';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route exact path={'/'} element={<Cities />}></Route>
                    <Route exact path={'/movies'} element={<Movies />}></Route>
                    <Route exact path={'/movies/add'} element={<AddMovie />}></Route>
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
