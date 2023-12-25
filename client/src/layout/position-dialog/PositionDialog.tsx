import { useEffect, useState } from "react";
import styles from "./PositionDialog.module.scss";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import CustomTextField from "../custom-text-field/CustomTextField";
import AddIcon from "@mui/icons-material/Add";
import ActionsButton from "../actions-button/ActionsButton";
import positionsStore from "../../stores/positions-store";
import { IPosition } from "../../interfaces/position.interface";
import { observer } from "mobx-react-lite";

interface Props {
  modalFunction: string;
  positionId?: number;
  initPosTitle?: string;
}

const PositionDialog = observer(
  ({ modalFunction, positionId, initPosTitle }: Props) => {
    const [position, setPosition] = useState<IPosition>({
      title: "",
    });
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPosition({
        ...position,
        title: event.target.value,
      });
    };

    const handlePositionSend = () => {
      modalFunction === "add"
        ? positionsStore.addPosition(position)
        : positionsStore.updatePosition(positionId!, position);

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
          <ActionsButton
            editFoo={handleClickOpen}
            removedItem={() => positionsStore.deletePosition(positionId!)}
          />
        )}
        <Dialog
          className={styles.modal}
          classes={{ paper: styles.paper }}
          open={open}
          onClose={handleClose}
        >
          {modalFunction === "add" ? (
            <DialogContent sx={{ width: "800px", height: "120px" }}>
              <CustomTextField
                title={"Position"}
                focus
                id={"position title"}
                label="Position title"
                type={"name"}
                onChange={onChange}
              />
            </DialogContent>
          ) : (
            <DialogContent sx={{ width: "800px", height: "120px" }}>
              <CustomTextField
                title={"Current position"}
                focus
                id={"name"}
                defaultValue={initPosTitle}
                onChange={onChange}
                type={"name"}
              />
            </DialogContent>
          )}
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="error">
              Cancel
            </Button>
            <Button
              onClick={handlePositionSend}
              variant="outlined"
              color="success"
            >
              {modalFunction}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

export default PositionDialog;
