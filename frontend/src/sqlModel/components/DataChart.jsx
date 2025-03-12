import React, { useEffect, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import axios from "axios";
import { FormControl, MenuItem, Select } from "@mui/material";

export default function MultiAxisChart() {
  const [dataset, setDataset] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedTradeCode, setSelectedTradeCode] = useState("");
  const [tradeCodes, setTradeCodes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/sql-model/find")
      .then((response) => {
        const formattedData = response.data.map((row) => ({
          date: row.date, 
          close: row.close,
          volume: row.volume, 
          trade_code: row.trade_code, 
        }));

        setDataset(formattedData);
        const uniqueTradeCodes = [...new Set(formattedData.map((d) => d.trade_code))];
        setTradeCodes(uniqueTradeCodes);
        if (uniqueTradeCodes.length > 0) {
          setSelectedTradeCode(uniqueTradeCodes[0]);
        }
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  useEffect(() => {
    if (selectedTradeCode) {
      setFilteredData(dataset.filter((d) => d.trade_code === selectedTradeCode));
    }
  }, [selectedTradeCode, dataset]);

  return (
    <div style={{ width: "100%" }}>
      {/* Dropdown for Trade Code Selection */}
      <FormControl align="center" style={{ width: "200px", marginBottom: "20px", display: "absolute", right: "10px"}}>
        <Select value={selectedTradeCode} onChange={(e) => setSelectedTradeCode(e.target.value)}>
          {tradeCodes.map((code) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Multi-Axis Chart */}
      <BarChart
        dataset={filteredData}
        xAxis={[
          { scaleType: "band", dataKey: "date", label: "Date" }, 
        ]}
        series={[{ dataKey: "volume", label: "Trading Volume", yAxisKey: "volumeAxis" }]} 
        yAxis={[
          { id: "volumeAxis", scaleType: "linear", position: "right" }, 
        ]}
        sx={{
          [`& .${axisClasses.directionY} .${axisClasses.label}`]: { transform: "translateX(-10px)" },
        }}
        height={300} 
      />

      <LineChart
        dataset={filteredData}
        xAxis={[
          { scaleType: "band", dataKey: "date", label: "Date" }, 
        ]}
        series={[{ dataKey: "close", label: "Closing Price", yAxisKey: "priceAxis" }]} 
        yAxis={[
          { id: "priceAxis", scaleType: "linear", position: "right" }, 
        ]}
        sx={{
          [`& .${axisClasses.directionY} .${axisClasses.label}`]: { transform: "translateX(-12px)" },
        }}
        height={300}
      />
    </div>
  );
}
