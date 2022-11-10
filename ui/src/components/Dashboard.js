import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import ShiftsTable from './ShiftsTable';

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

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    handleClose();
  };

  return (
    <Container maxWidth='lg'>
      <Box sx={{ my: 4 }}>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Typography variant='h4' component='h1' gutterBottom mb={0}>
            Shifts
          </Typography>

          <Button variant='contained' onClick={handleOpen}>
            Set Shift Assignment
          </Button>
        </Grid>

        <ShiftsTable />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Grid
              container
              direction='column'
              alignItems='flex-start'
              spacing={2}
            >
              <Grid item>
                <Typography id='modal-modal-title' variant='h5' component='h2'>
                  Set Shift Assignment
                </Typography>
              </Grid>

              <Grid item width='100%'>
                <FormControl fullWidth>
                  <InputLabel id='shift-select-label'>Shift</InputLabel>
                  <Select
                    labelId='shift-select-label'
                    id='shift-select'
                    name='shift-select'
                    value={shift}
                    label='Shift'
                    onChange={handleChange}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 300,
                        },
                      },
                    }}
                  >
                    {shifts?.map((shift) => (
                      <MenuItem key={shift.id} value={shift}>
                        {shift.name}: {new Date(shift.start).toLocaleString()}-
                        {new Date(shift.end).toLocaleString()} (
                        {shift.qual_required})
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item width='100%'>
                <FormControl fullWidth>
                  <InputLabel id='nurse-select-label'>Nurse</InputLabel>
                  <Select
                    labelId='nurse-select-label'
                    id='nurse-select'
                    name='nurse-select'
                    value={nurse}
                    label='Nurse'
                    onChange={handleChange}
                    MenuProps={{
                      PaperProps: {
                        sx: {
                          maxHeight: 300,
                        },
                      },
                    }}
                  >
                    {nurses?.map((nurse) => (
                      <MenuItem key={nurse.id} value={nurse}>
                        {nurse.first_name} {nurse.last_name},{' '}
                        {nurse.qualification}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <Button variant='contained' onClick={handleSave}>
                  Save Assignment
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      </Box>
    </Container>
  );
}
