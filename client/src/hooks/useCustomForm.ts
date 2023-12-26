import { useState, useRef, ChangeEvent, useEffect } from "react";
import employeesStore from "../stores/employees-store";
import { IEmployee } from "../interfaces/employee.interface";
import dayjs from "dayjs";

const useCustomForm = () => {
  const [hasErrors, setHasErrors] = useState(false);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const [inputErrors, setInputErrors] = useState<Partial<IEmployee>>({
    firstName: "",
    lastName: "",
    hireDate: "",
  });

  const [formData, setFormData] = useState<IEmployee>({
    firstName: "",
    lastName: "",
    hireDate: null,
    positionId: 0,
    position: {
      title: "",
    },
    location: {
      title: "",
      lat: 0,
      lng: 0,
    },
  });

  const validateForm = (
    selectedDate?: Date | null,
    posId?: number,
    employeeLoc?: any
  ) => {
    let isValid = true;
    const errors: Partial<IEmployee> = {};

    if (firstNameRef.current?.value === "") {
      errors.firstName = "First name is required";
      isValid = false;
    }

    if (lastNameRef.current?.value === "") {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    if (selectedDate === null) {
      errors.hireDate = "Hire date is required";
      isValid = false;
    }

    setInputErrors(errors);
    setHasErrors(!isValid);
    return isValid;
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (
    forWhat: string,
    selectedDate?: Date | null,
    employeeId?: number,
    employeeLoc?: any,
    posId?: number
  ) => {
    const isValid = validateForm(selectedDate);

    if (!isValid) {
      return;
    }

    const newFormData: IEmployee = {
      firstName: firstNameRef.current?.value || "",
      lastName: lastNameRef.current?.value || "",
      hireDate: dayjs(selectedDate).format("DD MMM YYYY"),
      positionId: posId,
      location: {
        title: employeeLoc.loc,
        lng: employeeLoc.lng,
        lat: employeeLoc.lat,
      },
    };

    setFormData(newFormData);

    forWhat === "add"
      ? employeesStore.addEmployee(newFormData)
      : employeesStore.updateEmployee(employeeId!, newFormData);
  };

  return {
    firstNameRef,
    lastNameRef,
    formData,
    setFormData,
    handleInputChange,
    inputErrors,
    handleFormSubmit,
    hasErrors,
  };
};

export default useCustomForm;
