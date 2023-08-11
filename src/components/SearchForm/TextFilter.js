import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

export default function TextFilter({ name, value, setState }) {
  return (
    <TextField
      value={value}
      onChange={(e) => setState({ [name]: e.target.value })}
      id={name}
      variant="standard"
      InputLabelProps={{
        shrink: false,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{name}:</InputAdornment>
        ),
      }}
    />
  );
}
