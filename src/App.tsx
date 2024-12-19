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
import Nodes from "./views/Proxmox/Node/Nodes";
import VMs from "./views/Proxmox/VM/VMs";
import LXCs from "./views/Proxmox/LXC/LXCs";
import Node from "./views/Proxmox/Node/Node";
import Node_View from "./views/Proxmox/Node/Node";
import LXC_View from "./views/Proxmox/LXC/LXC";
import VM_View from "./views/Proxmox/VM/VM";

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
                    <Route path="/proxmox/nodes/:name" element={<Node_View/>}/>
                    <Route path="/proxmox/lxc" element={<LXCs/>}/>
                    <Route path="/proxmox/lxc/:name" element={<LXC_View/>}/>
                    <Route path="/proxmox/vm" element={<VMs/>}/>
                    <Route path="/proxmox/vm/:name" element={<VM_View/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
