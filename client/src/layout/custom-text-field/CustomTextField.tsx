import TextField from "@mui/material/TextField";

enum TextFieldVariants {
  Filled = "filled",
  Outlined = "outlined",
  Standard = "standard",
}

interface Props {
  title: string;
  error?: string;
  focus?: boolean;
  id: string;
  label?: string;
  type: string;
  variant?: TextFieldVariants | undefined;
  select?: boolean;
  helperText?: string;
  defaultValue?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, id?: number) => void;
  children?: React.ReactNode;
}

const CustomTextField = ({
  title,
  error,
  focus,
  id,
  label,
  type,
  variant,
  select,
  helperText,
  defaultValue,
  inputRef,
  onChange,
  children,
}: Props) => {
  return (
    <>
      <h2>{title}</h2>
      <TextField
        error={Boolean(error)}
        autoFocus={focus}
        margin="dense"
        id={id}
        label={label}
        type={type}
        fullWidth
        variant={variant}
        select={select}
        helperText={helperText}
        defaultValue={defaultValue}
        inputRef={inputRef}
        onChange={onChange}
      >
        {children}
      </TextField>
    </>
  );
};

export default CustomTextField;
