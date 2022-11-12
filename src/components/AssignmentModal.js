import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import request from '../libs/request';
import validate from '../libs/validate';
import { formatDate, formatNurseName } from '../utils';
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
  const { shifts, nurses, updateShift } = useGlobalStore();

  const [errors, setErrors] = useState([]);
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

  useEffect(() => {
    if (!nurse) return;

    const errors = validate(shifts, shift, nurse);
    setErrors(errors);
  }, [nurse, shift]);

  const reset = () => {
    setErrors([]);
    setShift('');
    setNurse('');
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSave = async () => {
    try {
      const { shiftID, nurseID } = await request(`/shifts/${shift.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          nurseID: nurse.id,
        }),
      });

      updateShift(shiftID, nurseID);
      handleClose();
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
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
                  {shift.name}: {formatDate(shift.start)}—
                  {formatDate(shift.end)} ({shift.qual_required})
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
                  {formatNurseName(nurse)}
                </MenuItem>
              ))}
            </DropdownMenu>
          </Grid>

          <Grid item>
            <Button
              variant='contained'
              disabled={!shift || Boolean(errors.length)}
              onClick={handleSave}
            >
              Save Assignment
            </Button>
          </Grid>

          <Grid item width='100%'>
            <Stack sx={{ width: '100%' }} spacing={1}>
              {errors.map((error) => (
                <Alert key={error} severity='warning'>
                  {error}
                </Alert>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
