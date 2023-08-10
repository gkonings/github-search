import MenuItem from "@mui/material/MenuItem";
import CheckIcon from "@mui/icons-material/Check";

export default function SortOption({ onClick, isActive, children }) {
  return (
    <MenuItem onClick={onClick} sx={{ pr: 2, pl: isActive ? 2 : 6 }}>
      {isActive && <CheckIcon sx={{ mr: 1 }} />}
      {children}
    </MenuItem>
  );
}
