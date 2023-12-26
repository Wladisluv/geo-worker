import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import employeesStore from "../../stores/employees-store";
import positionsStore from "../../stores/positions-store";

import ActionsButton from "../actions-button/ActionsButton";
import CustomTextField from "../custom-text-field/CustomTextField";
import CustomDatePicker from "../custom-date-picker/CustomDatePicker";
import useCustomForm from "../../hooks/useCustomForm";
import Map from "../../pages/map/Map";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { MenuItem } from "@mui/material";

import styles from "./EmployeeDialog.module.scss";

interface Props {
  modalFunction: string;
  employeeId?: number;
  initialsValue?: [
    string,
    string,
    any,
    [number, number, string],
    [string, number?]
  ];
  updateLocation?: any;
}

const EmployeeDialog = observer(
  ({ modalFunction, employeeId, initialsValue, updateLocation }: Props) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedLoc, setSelectedLoc] = useState({});
    const [selectedPos, setSelectedPos] = useState({
      id: 0,
      title: "",
    });
    const { firstNameRef, lastNameRef, handleFormSubmit } = useCustomForm();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (newDate: Date | null) => {
      setSelectedDate(newDate);
    };

    const handleChangePos = (posId: number, posTitle: string) => {
      setSelectedPos({ id: posId, title: posTitle });
      console.log(posTitle);
    };

    const handleMapClick = (mapData: {
      lng: number;
      lat: number;
      loc: string;
    }) => {
      const { lng, lat, loc } = mapData;

      setSelectedLoc({ lat, lng, loc });
      updateLocation?.(mapData);
    };

    useEffect(() => {
      return handleMapClick({
        lat: initialsValue?.[3][1]!,
        lng: initialsValue?.[3][0]!,
        loc: initialsValue?.[3][2]!,
      });
    }, []);

    return (
      <>
        {modalFunction === "add" ? (
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Add an employee
          </Button>
        ) : (
          <ActionsButton
            editFoo={handleClickOpen}
            removedItem={() => employeesStore.deleteEmployee(employeeId!)}
          />
        )}
        <Dialog
          className={styles.modal}
          classes={{ paper: styles.paper }}
          open={open}
          onClose={handleClose}
        >
          <DialogContent sx={{ width: "800px", height: "600px" }}>
            <div className={styles.top}>
              <div style={{ width: "370px" }}>
                <CustomTextField
                  title={"First name"}
                  defaultValue={
                    modalFunction === "add" ? "" : initialsValue?.[0]
                  }
                  focus
                  id={"name"}
                  label={"Employee first name"}
                  type={"name"}
                  inputRef={firstNameRef}
                />
              </div>
              <div style={{ width: "370px" }}>
                <CustomTextField
                  title={"Last name"}
                  defaultValue={
                    modalFunction === "add" ? "" : initialsValue?.[1]
                  }
                  id={"surName"}
                  label={"Employee last name"}
                  type={"name"}
                  inputRef={lastNameRef}
                />
              </div>
            </div>
            <div className={styles.middle}>
              <div style={{ maxWidth: "170px" }}>
                <h2>Hire date</h2>
                <CustomDatePicker
                  onChange={handleChange}
                  defaultValue={
                    modalFunction === "add" ? null : initialsValue?.[2]
                  }
                />
              </div>
              <div style={{ marginLeft: "20px", width: "100%" }}>
                <CustomTextField
                  title={"Position"}
                  select
                  id={"position title"}
                  helperText="Please select employee position"
                  type={"name"}
                  defaultValue={
                    modalFunction === "edit" ? initialsValue?.[4][0] : ""
                  }
                  onChange={(event) => {
                    const selectedPos = positionsStore.positions.find(
                      (pos) => pos.title === event.target.value
                    );
                    if (selectedPos) {
                      handleChangePos(selectedPos?.id!, event.target.value);
                    }
                  }}
                >
                  {positionsStore.positions.map((pos) => (
                    <MenuItem key={pos.id} value={pos.title}>
                      {pos.title}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </div>
            </div>
            <h2>Map</h2>
            <Map
              mapCall="modal"
              onMapClick={handleMapClick}
              {...(modalFunction === "add"
                ? null
                : {
                    employeeMarker: {
                      lng: initialsValue?.[3][0]!,
                      lat: initialsValue?.[3][1]!,
                      address: initialsValue?.[3][2]!,
                    },
                  })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="outlined" color="error">
              Cancel
            </Button>
            <div onClick={handleClose}>
              <Button
                type="submit"
                onClick={
                  modalFunction === "add"
                    ? () =>
                        handleFormSubmit(
                          modalFunction,
                          selectedDate,
                          0,
                          selectedLoc,
                          selectedPos?.id
                        )
                    : () =>
                        handleFormSubmit(
                          modalFunction,
                          selectedDate ? selectedDate : initialsValue?.[2],
                          employeeId,
                          selectedLoc,
                          selectedPos?.id
                            ? selectedPos.id
                            : initialsValue?.[4][1]
                        )
                }
                variant="outlined"
                color="success"
              >
                {modalFunction}
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      </>
    );
  }
);

export default EmployeeDialog;
