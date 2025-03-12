import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button, Container } from "@mui/material";

import JsonModel from "./jsonModel/FetchData";
import SqlModel from "./sqlModel/StockMarketTable"; 
import Charts from "./sqlModel/components/DataChart";

const DashboardLayout = () => {
  return (
    <Router>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* Top Navigation Bar */}
        <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6">
              <a
                href="https://www.linkedin.com/in/dristi-rashid/"
                target="_blank"
                style={{ color: "white", textDecoration: "none" }}
              >
                Dristi Rashid
              </a>
            </Typography>
            <Box>
              <Button color="inherit" component={Link} to="/json-model">JSON Model</Button>
              <Button color="inherit" component={Link} to="/sql-model">SQL Model</Button>
              <Button color="inherit" component={Link} to="/charts">Charts</Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Container sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/json-model" replace />} />
            <Route path="/json-model" element={<JsonModel />} />
            <Route path="/sql-model" element={<SqlModel />} />
            <Route path="/charts" element={<Charts />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
};

export default DashboardLayout;
