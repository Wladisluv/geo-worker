import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import AddIcon from "@mui/icons-material/Add";

import styles from "./Modal.module.scss";
import CustomDatePicker from "../date-picker/CustomDatePicker";
import ActionsButton from "../actions-button/ActionsButton";
import Map from "../../pages/map/Map";

interface Props {
  modalFunction: string;
  forWhat: string;
}

export default function Modal({ modalFunction, forWhat }: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {modalFunction === "add" ? (
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          {forWhat === "employees" ? "Add an employee" : "Add position"}
        </Button>
      ) : (
        <ActionsButton editFoo={handleClickOpen} />
      )}
      {forWhat === "employees" ? (
        <Dialog
          className={styles.modal}
          classes={{ paper: styles.paper }}
          open={open}
          onClose={handleClose}
        >
          <DialogContent sx={{ width: "800px", height: "600px" }}>
            <h2>Full name</h2>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Employee full name"
              type="name"
              fullWidth
              variant="outlined"
            />
            <div className={styles.middle}>
              <div style={{ maxWidth: "170px" }}>
                <h2>Hire date</h2>
                <CustomDatePicker />
              </div>
              <div style={{ marginLeft: "20px", width: "100%" }}>
                <h2>Position</h2>
                <TextField
                  margin="dense"
                  id="outlined-select-currency"
                  select
                  defaultValue="none"
                  fullWidth
                  helperText="Please select employee position"
                />
              </div>
            </div>
            <h2>Map</h2>
            <Map mapCall="modal" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="error">
              Cancel
            </Button>
            <Button onClick={handleClose} variant="outlined" color="success">
              {modalFunction}
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          className={styles.modal}
          classes={{ paper: styles.paper }}
          open={open}
          onClose={handleClose}
        >
          {modalFunction === "add" ? (
            <DialogContent sx={{ width: "800px", height: "150px" }}>
              <h2>Position</h2>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Position title"
                type="name"
                fullWidth
                variant="outlined"
              />
            </DialogContent>
          ) : (
            <DialogContent sx={{ width: "800px", height: "250px" }}>
              <h2>Current position</h2>
              <TextField
                margin="dense"
                id="outlined-select-currency"
                select
                defaultValue="none"
                fullWidth
                helperText="Please select employee position to change"
              />
              <h2>New position</h2>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="New position title"
                type="name"
                fullWidth
                variant="outlined"
              />
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="error">
              Cancel
            </Button>
            <Button onClick={handleClose} variant="outlined" color="success">
              {modalFunction}
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
