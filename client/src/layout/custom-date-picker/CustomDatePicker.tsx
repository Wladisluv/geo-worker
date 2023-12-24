import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";

import styles from "./CustomDatePicker.module.scss";
import dayjs from "dayjs";

interface Props {
  onChange: (selectedDate: Date | null) => void;
  defaultValue: Date | null;
}

const CustomDatePicker = ({ onChange, defaultValue }: Props) => {
  return (
    <div className={styles.datePicker}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DatePicker onChange={onChange} defaultValue={defaultValue} />
      </LocalizationProvider>
    </div>
  );
};

export default CustomDatePicker;
