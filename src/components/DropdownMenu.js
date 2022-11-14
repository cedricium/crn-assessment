import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';

export default function DropdownMenu({ id, label, value, onChange, children }) {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${id}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${id}-select-label`}
        id={`${id}-select`}
        name={`${id}-select`}
        value={value}
        label={label}
        onChange={onChange}
        MenuProps={{
          PaperProps: {
            sx: {
              maxHeight: 300,
            },
          },
        }}
      >
        {children}
      </Select>
    </FormControl>
  );
}
