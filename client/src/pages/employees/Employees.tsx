import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import employeesStore from "../../stores/employees-store";

import { useSearchEmployees } from "../../hooks/useSearchEmployees";
import EmployeeDialog from "../../layout/employee-dialog/EmployeeDialog";
import dayjs from "dayjs";
import { Divider, InputAdornment, OutlinedInput, Tooltip } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import SearchIcon from "@mui/icons-material/Search";

import styles from "./Employees.module.scss";

const Employees = observer(() => {
  const [query, setQuery] = useState("");
  useEffect(() => {
    employeesStore.loadEmployees();
  }, []);

  const searchedEmployees = useSearchEmployees(query);

  return (
    <>
      <div className={styles.top}>
        <div>
          <h1>Employees</h1>
        </div>
        <div>
          <EmployeeDialog modalFunction="add" />
        </div>
      </div>
      <OutlinedInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ width: "360px", marginTop: "20px" }}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
        type="search"
        placeholder="Search for employees"
      />
      <div className={styles.main}>
        <div className={styles.mainTop}>
          <div>PERSON</div>
          <div>POSITION</div>
          <div>HIRE DATE</div>
          <div>LOCATION</div>
          <div style={{ textAlign: "end" }}>ACTIONS</div>
        </div>
        <Divider
          sx={{
            marginTop: "10px",
            marginLeft: "-20px",
            marginRight: "-20px",
          }}
          className={styles.divider}
        />
        {employeesStore.employees.length === 0 ? (
          <h2 className={styles.stub}>No employees found 🔎</h2>
        ) : (
          searchedEmployees.map((employee) => {
            return (
              <div className={styles.contentItem} key={employee.id}>
                <div className={styles.contentInner}>
                  <div>{`${employee.firstName} ${employee.lastName}`}</div>
                  <div>{employee.position?.title}</div>
                  <div>{employee.hireDate}</div>
                  <Tooltip title={employee.location?.title}>
                    <div className={styles.address}>
                      <RoomIcon />
                      <p>
                        {employee.location?.title?.length! > 25
                          ? `${employee.location?.title?.slice(0, 25)}...`
                          : employee.location?.title}
                      </p>
                    </div>
                  </Tooltip>
                  <div
                    style={{
                      textAlign: "end",
                      marginTop: "-10px",
                    }}
                  >
                    <EmployeeDialog
                      modalFunction="edit"
                      employeeId={employee.id}
                      initialsValue={[
                        employee.firstName,
                        employee.lastName,
                        dayjs(employee.hireDate),
                        [
                          employee.location?.lng!,
                          employee.location?.lat!,
                          employee.location?.title!,
                        ],
                        [employee.position?.title!, employee.position?.id],
                      ]}
                    />
                  </div>
                </div>
                <Divider sx={{ marginTop: "10px" }} />
              </div>
            );
          })
        )}
      </div>
    </>
  );
});

export default Employees;
