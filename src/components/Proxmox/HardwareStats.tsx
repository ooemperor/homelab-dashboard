/**
 * File to define Hardware Stats Row for the use in Proxmox stats
 * @author ooemperor
 */
import React from "react";
import MemoryCard from "./StatsCards/MemoryCard";
import CpuCard from "./StatsCards/CpuCard";
import {Machine} from "../../models/proxmox/Machines";
import UptimeCard from "./StatsCards/UptimeCard";

/**
 * Function to render the HardwareStatsRow
 * @param maxCpu The amount of CPU Cores assigned to the machine
 * @param maxMem The maximal amount of memory avaible
 */
export default function HardwareStatsRow(maxCpu: number, maxMem: number) {
    return (
        <div className="row">
            <div className="col">
                {CpuCard(maxCpu)}
            </div>
            <div className="col">
                {MemoryCard(maxMem)}
            </div>
        </div>
    )
}

/**
 * Function to render the HardwareStatsRow
 * @param machine The machine for which we want to see the stats
 */
export function HardwareStatsMachineRow(machine: Machine): React.ReactElement {
    return (
        <div className="row">
            <div className="col">
                {CpuCard(machine.maxcpu)}
            </div>
            <div className="col">
                {MemoryCard(machine.maxmem)}
            </div>
            <div className="col">
                {UptimeCard(machine.uptime)}
            </div>
        </div>
    )
}