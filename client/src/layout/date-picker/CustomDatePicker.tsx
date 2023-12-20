import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/de";

import styles from "./CustomDatePicker.module.scss";

const CustomDatePicker = () => {
  return (
    <div className={styles.datePicker}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
        <DatePicker />
      </LocalizationProvider>
    </div>
  );
};

export default CustomDatePicker;
