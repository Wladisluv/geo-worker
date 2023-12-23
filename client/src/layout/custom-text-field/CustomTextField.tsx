import TextField from "@mui/material/TextField";

enum TextFieldVariants {
  Filled = "filled",
  Outlined = "outlined",
  Standard = "standard",
}

interface Props {
  title: string;
  focus?: boolean;
  id: string;
  label?: string;
  type: string;
  variant?: TextFieldVariants | undefined;
  select?: boolean;
  helperText?: string;
  defaultValue?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

const CustomTextField = ({
  title,
  focus,
  id,
  label,
  type,
  variant,
  select,
  helperText,
  defaultValue,
  inputRef,
}: Props) => {
  return (
    <>
      <h2>{title}</h2>
      <TextField
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
      />
    </>
  );
};

export default CustomTextField;
