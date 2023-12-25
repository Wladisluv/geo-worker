import { useState, useRef, ChangeEvent } from "react";
import employeesStore from "../stores/employees-store";
import { IEmployee } from "../interfaces/employee.interface";
import dayjs from "dayjs";

const useCustomForm = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const hireDateRef = useRef<HTMLInputElement>(null);
  const positionId = useRef<HTMLInputElement>(null);
  const location = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<IEmployee>({
    firstName: "",
    lastName: "",
    hireDate: null,
    positionId: 1,
    location: {
      title: "",
      lat: 0,
      lng: 0,
    },
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (
    forWhat: string,
    selectedDate?: Date | null,
    employeeId?: number,
    employeeLoc?: any
  ) => {
    const newFormData: IEmployee = {
      firstName: firstNameRef.current?.value || "",
      lastName: lastNameRef.current?.value || "",
      hireDate: dayjs(selectedDate).format("DD MMM YYYY"),
      positionId: 1,
      location: {
        title: employeeLoc.loc,
        lat: employeeLoc.lat,
        lng: employeeLoc.lng,
      },
    };

    setFormData(newFormData);
    {
      forWhat === "add"
        ? employeesStore.addEmployee(newFormData)
        : employeesStore.updateEmployee(employeeId!, newFormData);
    }
  };

  return {
    firstNameRef,
    lastNameRef,
    hireDateRef,
    formData,
    setFormData,
    handleInputChange,
    handleFormSubmit,
  };
};

export default useCustomForm;
