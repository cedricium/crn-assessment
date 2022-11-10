import { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';

import { useGlobalStore } from '../context/GlobalStore';
import DropdownMenu from './DropdownMenu';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '100%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AssignmentModal({ open, onClose }) {
  const { shifts, nurses } = useGlobalStore();

  const [shift, setShift] = useState('');
  const [nurse, setNurse] = useState('');
  const handleChange = (event) => {
    switch (event.target.name) {
      case 'shift-select':
        setShift(event.target.value);
        break;
      case 'nurse-select':
        setNurse(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleSave = (event) => {
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Grid container direction='column' alignItems='flex-start' spacing={2}>
          <Grid item>
            <Typography id='modal-modal-title' variant='h5' component='h2'>
              Set Shift Assignment
            </Typography>
          </Grid>

          <Grid item width='100%'>
            <DropdownMenu
              id='shift'
              label='Shift'
              value={shift}
              onChange={handleChange}
            >
              {shifts?.map((shift) => (
                <MenuItem key={shift.id} value={shift}>
                  {shift.name}: {new Date(shift.start).toLocaleString()}-
                  {new Date(shift.end).toLocaleString()} ({shift.qual_required})
                </MenuItem>
              ))}
            </DropdownMenu>
          </Grid>

          <Grid item width='100%'>
            <DropdownMenu
              id='nurse'
              label='Nurse'
              value={nurse}
              onChange={handleChange}
            >
              {nurses?.map((nurse) => (
                <MenuItem key={nurse.id} value={nurse}>
                  {nurse.first_name} {nurse.last_name}, {nurse.qualification}
                </MenuItem>
              ))}
            </DropdownMenu>
          </Grid>

          <Grid item>
            <Button variant='contained' onClick={handleSave}>
              Save Assignment
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
