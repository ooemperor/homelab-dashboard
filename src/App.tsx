'use client';
/**
 * App file for running and defining all the routes of the Homelab Dashboard
 * @author: ooemperor
 */
import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./views/Home/Home";
import NavLayout from "./components/NavLayout";
import Nodes from "./views/Proxmox/Nodes";
import VMs from "./views/Proxmox/VMs";
import LXCs from "./views/Proxmox/LXCs";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={
                    <NavLayout>
                    </NavLayout>
                }>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/proxmox/nodes" element={<Nodes/>}/>
                    <Route path="/proxmox/lxc" element={<LXCs/>}/>
                    <Route path="/proxmox/vm" element={<VMs/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
