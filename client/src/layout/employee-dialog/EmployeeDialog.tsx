import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ActionsButton from "../actions-button/ActionsButton";
import Dialog from "@mui/material/Dialog";
import styles from "./EmployeeDialog.module.scss";
import DialogContent from "@mui/material/DialogContent";
import CustomTextField from "../custom-text-field/CustomTextField";
import CustomDatePicker from "../custom-date-picker/CustomDatePicker";
import Map from "../../pages/map/Map";
import DialogActions from "@mui/material/DialogActions";
import { useEffect, useState } from "react";
import useCustomForm from "../../hooks/useCustomForm";
import { observer } from "mobx-react-lite";
import employeesStore from "../../stores/employees-store";
import { IEmployee } from "../../interfaces/employee.interface";
import dayjs from "dayjs";

interface Props {
  modalFunction: string;
  employeeId?: number;
  initialsValue?: [string, string, any];
}

const EmployeeDialog = observer(
  ({ modalFunction, employeeId, initialsValue }: Props) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const { firstNameRef, lastNameRef, formData, handleFormSubmit } =
      useCustomForm();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleChange = (newDate: Date | null) => {
      console.log("Selected date:", newDate);
      setSelectedDate(newDate);
    };

    console.log("formData!!!", formData);

    console.log("DATEEEE!!", initialsValue?.[2]);

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
            removedEmployee={() => employeesStore.deleteEmployee(employeeId!)}
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
            <div onClick={handleClose}>
              <Button
                type="submit"
                onClick={
                  modalFunction === "add"
                    ? () => handleFormSubmit(modalFunction, selectedDate)
                    : () =>
                        handleFormSubmit(
                          modalFunction,
                          selectedDate ? selectedDate : initialsValue?.[2],
                          employeeId
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
