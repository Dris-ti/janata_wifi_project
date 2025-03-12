import * as React from "react";
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
import { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

import NewEntry from "./components/NewEntry";

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

export default function StockMarketTable() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editRow, setEditRow] = useState(null);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newRow, setNewRow] = useState({
    date: "",
    trade_code: "",
    high: "",
    low: "",
    open: "",
    close: "",
    volume: "",
  });

  // Fetch data from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/sql-model/find")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleEdit = (id) => {
    const rowToEdit = data.find((row) => row._id === id);
    setEditIndex(id);
    setEditRow({ ...rowToEdit });
    console.log(editRow);
    console.log(rowToEdit);
    console.log(id);
  };
  

  const handleEditChange = (e, field) => {
    setEditRow({ ...editRow, [field]: e.target.value });
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:3000/sql-model/update/${id}`, editRow);
      const updatedData = data.map((row) =>
        row._id === id ? { ...row, ...editRow } : row
      );
      setData(updatedData); 
      setEditIndex(null);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };


  const handleCancelEdit = () => {
    setEditIndex(null);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/sql-model/delete/${id}`)
      .then(() => {
        setData(data.filter((row) => row._id !== id));
      })
      .catch((error) => console.error("Error deleting data:", error));
  };
  

  const handleAddChange = (e, field) => {
    setNewRow({ ...newRow, [field]: e.target.value });
  };

  const handleAdd = () => {
    axios
      .post("http://localhost:3000/sql-model/create", newRow)
      .then((response) => {
        setData([...data, response.data]);
        setOpenAddModal(false);
        setNewRow({
          date: "",
          trade_code: "",
          high: "",
          low: "",
          open: "",
          close: "",
          volume: "",
        });
      })
      .catch((error) => console.error("Error adding data:", error));
  };

  const handleClose = () => {
    setOpenAddModal(false);
    setNewRow({
      date: "",
      trade_code: "",
      high: "",
      low: "",
      open: "",
      close: "",
      volume: "",
    });
  };

  const paginatedRows = data.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  return (
    <div style={{ padding: "5px" }}>
      <h1>Stock Market Data using SQL data</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Date</StyledTableCell>
              <StyledTableCell align="center">Trade Code</StyledTableCell>
              <StyledTableCell align="center">High</StyledTableCell>
              <StyledTableCell align="center">Low</StyledTableCell>
              <StyledTableCell align="center">Open</StyledTableCell>
              <StyledTableCell align="center">Close</StyledTableCell>
              <StyledTableCell align="center">Volume</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row, index) => (
              <StyledTableRow key={row._id}>
                {editIndex === row._id ? (
                  <>
                    <StyledTableCell align="center">
                      <TextField
                        size="small"
                        type="date"
                        value={editRow.date}
                        onChange={(e) => handleEditChange(e, "date")}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <TextField
                        size="small"
                        value={editRow.trade_code}
                        onChange={(e) => handleEditChange(e, "trade_code")}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <TextField
                        size="small"
                        type="number"
                        value={editRow.high}
                        onChange={(e) => handleEditChange(e, "high")}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <TextField
                        size="small"
                        type="number"
                        value={editRow.low}
                        onChange={(e) => handleEditChange(e, "low")}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <TextField
                        size="small"
                        type="number"
                        value={editRow.open}
                        onChange={(e) => handleEditChange(e, "open")}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <TextField
                        size="small"
                        type="number"
                        value={editRow.close}
                        onChange={(e) => handleEditChange(e, "close")}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <TextField
                        size="small"
                        type="number"
                        value={editRow.volume}
                        onChange={(e) => handleEditChange(e, "volume")}
                      />
                    </StyledTableCell>
                    
                    <StyledTableCell align="center">
                      <Fab
                        size="small"
                        color="success"
                        aria-label="save"
                        onClick={() => handleSave(row._id)}
                      >
                        <CheckIcon />
                      </Fab>
                      <Fab
                        size="small"
                        color="secondary"
                        aria-label="cancel"
                        onClick={handleCancelEdit}
                      >
                        <ClearIcon />
                      </Fab>
                    </StyledTableCell>
                  </>
                ) : (
                  <>
                    <StyledTableCell align="center">{row.date ? row.date.split("T")[0] : ""}</StyledTableCell>
                    <StyledTableCell align="center">{row.trade_code}</StyledTableCell>
                    <StyledTableCell align="center">{row.high}</StyledTableCell>
                    <StyledTableCell align="center">{row.low}</StyledTableCell>
                    <StyledTableCell align="center">{row.open}</StyledTableCell>
                    <StyledTableCell align="center">{row.close}</StyledTableCell>
                    <StyledTableCell align="center">{row.volume}</StyledTableCell>
                    <StyledTableCell align="center">
                      <Fab
                        size="small"
                        color="primary"
                        
                        aria-label="edit"
                        onClick={() => handleEdit(row._id)}
                      >
                        <EditIcon />
                      </Fab>

                      <Fab
                        size="small"
                        color="error"
                        aria-label="delete"
                        onClick={() => handleDelete(row._id)}
                      >
                        <DeleteIcon />
                      </Fab>
                    </StyledTableCell>
                  </>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} sx={{ marginTop: 2, alignItems: "center" }}>
        <Pagination
          count={Math.ceil(data.length / ROWS_PER_PAGE)}
          page={page}
          onChange={handlePageChange}
          shape="rounded"
        />
      </Stack>

      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpenAddModal(true)}
        sx={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <AddIcon />
      </Fab>

      <NewEntry
        open={openAddModal}
        handleClose={handleClose}
        handleAdd={handleAdd}
        newRow={newRow}
        handleAddChange={handleAddChange}
      />
    </div>
  );
}
