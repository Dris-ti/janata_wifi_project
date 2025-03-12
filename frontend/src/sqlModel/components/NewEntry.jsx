import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

export default function NewEntry({ open, handleClose, handleAdd, newRow, handleAddChange }) {
    
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add New Stock Entry</DialogTitle>
      <DialogContent>
        <TextField margin="dense" type="date" fullWidth value={newRow.date} onChange={(e) => handleAddChange(e, "date")} />
        <TextField margin="dense" label="Trade Code" fullWidth value={newRow.trade_code} onChange={(e) => handleAddChange(e, "trade_code")} />
        <TextField margin="dense" label="High" type="number" fullWidth value={newRow.high} onChange={(e) => handleAddChange(e, "high")} />
        <TextField margin="dense" label="Low" type="number" fullWidth value={newRow.low} onChange={(e) => handleAddChange(e, "low")} />
        <TextField margin="dense" label="Open" type="number" fullWidth value={newRow.open} onChange={(e) => handleAddChange(e, "open")} />
        <TextField margin="dense" label="Close" type="number" fullWidth value={newRow.close} onChange={(e) => handleAddChange(e, "close")} />
        <TextField margin="dense" label="Volume" type="number" fullWidth value={newRow.volume} onChange={(e) => handleAddChange(e, "volume")} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleAdd} color="primary" variant="contained">Add</Button>
      </DialogActions>
    </Dialog>
  );
}
