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
    hireDate: "",
    positionId: 1,
    location: {
      lat: 0,
      lng: 0,
    },
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (selectedDate: Date | null) => {
    if (selectedDate) {
      const formattedDate = dayjs(selectedDate).format("DD MMM YYYY");

      const newFormData: IEmployee = {
        firstName: firstNameRef.current?.value || "",
        lastName: lastNameRef.current?.value || "",
        hireDate: formattedDate,
        positionId: 1,
        location: {
          lat: 0,
          lng: 0,
        },
      };

      setFormData(newFormData);
      employeesStore.addEmployee(newFormData);
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
