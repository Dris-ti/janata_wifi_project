import React, { useEffect, useState } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const ROWS_PER_PAGE = 10;

const FetchStockMarketData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/json-model/get-stock-market-data"
        );
        if (response.status === 200) {
          setData(response.data);
          setLoading(false);
        }
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error.message}</h2>;

  const paginatedRows = data.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  return (
    <div style={{ padding: "5px" }}>
      <h1>Stock Market Data using JSON data</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Trade Code</StyledTableCell>
              <StyledTableCell align="center">High</StyledTableCell>
              <StyledTableCell align="center">Low</StyledTableCell>
              <StyledTableCell align="center">Open</StyledTableCell>
              <StyledTableCell align="center">Close</StyledTableCell>
              <StyledTableCell align="center">Volume</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((item, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell align="center">{item.date}</StyledTableCell>
                <StyledTableCell align="center">{item.trade_code}</StyledTableCell>
                <StyledTableCell align="center">{item.high}</StyledTableCell>
                <StyledTableCell align="center">{item.low}</StyledTableCell>
                <StyledTableCell align="center">{item.open}</StyledTableCell>
                <StyledTableCell align="center">{item.close}</StyledTableCell>
                <StyledTableCell align="center">{item.volume}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} sx={{ marginTop: 2, alignItems: "center" }}>
        <Pagination
          count={Math.ceil(data.length / ROWS_PER_PAGE)}
          page={page}
          onChange={(event, value) => setPage(value)}
          shape="rounded"
        />
      </Stack>
    </div>
  );
};

export default FetchStockMarketData;
