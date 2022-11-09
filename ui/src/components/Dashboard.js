import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import ShiftsTable from './ShiftsTable';

export default function Dashboard() {
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
        </Grid>

        <ShiftsTable />
      </Box>
    </Container>
  );
}
