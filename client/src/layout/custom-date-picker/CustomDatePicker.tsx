import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/en-gb";

import styles from "./CustomDatePicker.module.scss";

interface Props {
  onChange: (selectedDate: Date | null) => void;
}

const CustomDatePicker = ({ onChange }: Props) => {
  return (
    <div className={styles.datePicker}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
        <DatePicker onChange={onChange} />
      </LocalizationProvider>
    </div>
  );
};

export default CustomDatePicker;
