/**
 * App file for running and defining all the routes of the Homelab Dashboard
 * @author: ooemperor
 */
import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./views/Home";
import NavLayout from "./components/NavLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={
                    <NavLayout>
                    </NavLayout>
                }>
                    <Route path="/" element={<Home/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
