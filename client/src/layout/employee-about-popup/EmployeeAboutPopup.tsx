import React, { useState } from "react";

import { Dialog, DialogContent } from "@mui/material";

import styles from "./EmployeeAboutPopup.module.scss";
import { IEmployee } from "../../interfaces/employee.interface";

interface Props {
  employee: IEmployee;
  open: boolean;
  close: () => void;
}

const EmployeeAboutPopup = ({ employee, open, close }: Props) => {
  return (
    <>
      <Dialog
        className={styles.modal}
        classes={{ paper: styles.paper }}
        open={open}
        onClose={close}
      >
        <DialogContent sx={{ width: "290px" }}>
          <div className={styles.about}>
            <div className={styles.item}>
              <p>Employee name:</p>
              {employee.firstName} {employee.lastName}
            </div>
            <div className={styles.item}>
              <p>Employee position:</p>
              {employee.position?.title} {employee.hireDate}
            </div>
            <div className={styles.item}>
              <p>Employee address:</p>
              {employee.location?.title}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EmployeeAboutPopup;
