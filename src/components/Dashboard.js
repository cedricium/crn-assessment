import { useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import ShiftsTable from './ShiftsTable';
import AssignmentModal from './AssignmentModal';

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <AssignmentModal open={open} onClose={handleClose} />
      </Box>
    </Container>
  );
}
