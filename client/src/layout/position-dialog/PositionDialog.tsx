import { useState } from "react";
import styles from "./PositionDialog.module.scss";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import CustomTextField from "../custom-text-field/CustomTextField";
import AddIcon from "@mui/icons-material/Add";
import ActionsButton from "../actions-button/ActionsButton";

interface Props {
  modalFunction: string;
}

const PositionDialog = ({ modalFunction }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {modalFunction === "add" ? (
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add position
        </Button>
      ) : (
        <ActionsButton editFoo={handleClickOpen} />
      )}
      <Dialog
        className={styles.modal}
        classes={{ paper: styles.paper }}
        open={open}
        onClose={handleClose}
      >
        {modalFunction === "add" ? (
          <DialogContent sx={{ width: "800px", height: "150px" }}>
            <CustomTextField
              title={"Position"}
              focus
              id={"position title"}
              label="Position title"
              type={"name"}
            />
          </DialogContent>
        ) : (
          <DialogContent sx={{ width: "800px", height: "300px" }}>
            <CustomTextField
              title={"Current position"}
              focus
              select
              id={"outlined-select-currency"}
              defaultValue={"none"}
              type={"name"}
              helperText="Please select employee position to change"
            />

            <CustomTextField
              title={"New position"}
              select
              id={"outlined-select-currency"}
              defaultValue={"none"}
              type={"name"}
              helperText="Please select new employee position"
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
    </>
  );
};

export default PositionDialog;
