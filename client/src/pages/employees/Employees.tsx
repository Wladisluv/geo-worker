import { useEffect, useState } from "react";

import { observer } from "mobx-react-lite";
import employeesStore from "../../stores/employees-store";

import { useSearchEmployees } from "../../hooks/useSearchEmployees";
import EmployeeDialog from "../../layout/employee-dialog/EmployeeDialog";
import dayjs from "dayjs";
import { Divider, InputAdornment, OutlinedInput, Tooltip } from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";

import styles from "./Employees.module.scss";
import EmployeeAboutPopup from "../../layout/employee-about-popup/EmployeeAboutPopup";

const Employees = observer(() => {
  const [query, setQuery] = useState("");
  const [aboutEmpOpen, setAboutEmpOpen] = useState(false);

  useEffect(() => {
    employeesStore.loadEmployees();
  }, []);

  const searchedEmployees = useSearchEmployees(query);

  const handleAboutEmpClose = () => {
    setAboutEmpOpen(false);
  };

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
        className={styles.search}
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
      {window.innerWidth > 770 ? (
        <>
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
                              ? `${employee.location?.title?.slice(0, 25)}...` // Обрезаем если >25 символов
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
                        <EmployeeDialog // Диалог для редактирования
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
      ) : (
        <div className={styles.main}>
          <div className={styles.mainTop}>
            <div>PERSON</div>
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
                  <EmployeeAboutPopup
                    employee={employee}
                    open={aboutEmpOpen}
                    close={handleAboutEmpClose}
                  />
                  <div className={styles.contentInner}>
                    <div className={styles.mobileEmployee}>
                      <InfoIcon onClick={() => setAboutEmpOpen(true)} />
                      {`${employee.firstName} ${employee.lastName}`}
                    </div>
                    <div
                      style={{
                        textAlign: "end",
                        marginTop: "-10px",
                      }}
                    >
                      <EmployeeDialog // Диалог для редактирования
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
      )}
    </>
  );
});

export default Employees;
