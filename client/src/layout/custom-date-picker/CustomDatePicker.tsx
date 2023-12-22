import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";

import styles from "./CustomDatePicker.module.scss";

const CustomDatePicker = () => {
  return (
    <div className={styles.datePicker}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DatePicker />
      </LocalizationProvider>
    </div>
  );
};

export default CustomDatePicker;
