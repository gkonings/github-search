import { useReducer, useEffect } from "react";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

import { setStateReducer } from "@/lib/utils";

export default function NumberFilter({ name, value, setState }) {
  const [filter, setFilter] = useReducer(setStateReducer, {
    type: ">",
    number: "",
  });
  const { type, number } = filter;

  useEffect(() => {
    const setValue = () => {
      const hasType = value.charAt(0) === "<" || value.charAt(0) === ">";
      const valueType = hasType ? value.charAt(0) : "=";
      const valueNumber = hasType ? value.slice(1) : value;
      setFilter({ type: valueType, number: valueNumber });
    };

    if (value) {
      setValue();
    }
  }, [value]);

  const onChange = (changedValues) => {
    setFilter(changedValues);
    const newFilter = { ...filter, ...changedValues };
    setFilter(newFilter);
    setState({
      [name]:
        newFilter.type === "="
          ? newFilter.number.toString()
          : `${newFilter.type}${newFilter.number}`,
    });
  };

  return (
    <Stack direction="row" sx={{ alignItems: "baseline" }}>
      <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <Select
          size="small"
          value={type}
          onChange={(e) => onChange({ type: e.target.value })}
          sx={{ mr: 1 }}
        >
          <MenuItem value="=">Exactly</MenuItem>
          <MenuItem value=">">More than</MenuItem>
          <MenuItem value="<">Less than</MenuItem>
        </Select>
      </FormControl>
      <TextField
        type="number"
        value={number}
        onChange={(e) => onChange({ number: e.target.value })}
        id={name}
        variant="standard"
        fullWidth
        InputLabelProps={{
          shrink: false,
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end">{name}</InputAdornment>,
        }}
      />
    </Stack>
  );
}
