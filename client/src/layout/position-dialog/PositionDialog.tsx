import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import positionsStore from "../../stores/positions-store";

import CustomTextField from "../custom-text-field/CustomTextField";
import ActionsButton from "../actions-button/ActionsButton";
import { IPosition } from "../../interfaces/position.interface";
import {
  Alert,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import styles from "./PositionDialog.module.scss";

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
    const [alertOpen, setAlertOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    if (alertOpen === true) {
      setTimeout(() => {
        setAlertOpen(false); // Закрываем ошибку через 3 секунды
      }, 3000);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.value !== "") {
        // Проверяем на пустой инпут
        setPosition({
          ...position,
          title: event.target.value,
        });
      }
    };

    const handlePositionSend = () => {
      if (position.title !== "") {
        modalFunction === "add"
          ? positionsStore.addPosition(position)
          : positionsStore.updatePosition(positionId!, position);

        setOpen(false);
      } else {
        setOpen(true);
      }
    };

    useEffect(() => {
      if (!positionsStore.positions.length) {
        setOpen(true);
      }
    }, []);

    const handleRemoveItem = async () => {
      try {
        await positionsStore.deletePosition(positionId!);
        setOpen(false);
      } catch (error) {
        console.error("Error deleting position:", error); // Если есть работники с выбранной для
        setAlertOpen(true); // удаления позицией выбрасываем ошибку
        setError(
          "Error deleting the position. There are workers with this position"
        );
      }
    };

    return (
      <>
        {
          <Collapse in={alertOpen}>
            <Alert
              className={styles.alert}
              severity="error"
              onClose={() => setAlertOpen(false)} // Сама ошибка с кнопкной для закрытия
            >
              {error}
            </Alert>
          </Collapse>
        }
        {modalFunction === "add" ? ( // Показ кнопок в соответствии с функцией диалога
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
            removedItem={handleRemoveItem}
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
