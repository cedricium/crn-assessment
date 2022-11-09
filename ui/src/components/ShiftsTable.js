import { useCallback } from 'react';
import useSWR from 'swr';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ShiftsTable() {
  const { data: shifts, error: shiftsError } = useSWR(
    'http://localhost:9001/shifts',
  );
  const { data: nurses, error: nursesError } = useSWR(
    'http://localhost:9001/nurses',
  );

  const getNurseInfo = useCallback(
    (nurseId) => {
      const matchingNurse = nurses?.find((nurse) => nurse.id === nurseId);
      return matchingNurse
        ? `${matchingNurse.first_name} ${matchingNurse.last_name} (${matchingNurse.qualification})`
        : nurseId;
    },
    [nurses],
  );

  if (shiftsError)
    return <Alert severity='error'>{shiftsError?.message}</Alert>;

  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Shift</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Certification Required</TableCell>
            <TableCell>Assigned Nurse</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {shifts?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {row.name}
              </TableCell>
              <TableCell>{new Date(row.start).toLocaleString()}</TableCell>
              <TableCell>{new Date(row.end).toLocaleString()}</TableCell>
              <TableCell>{row.qual_required}</TableCell>
              <TableCell>{getNurseInfo(row.nurse_id)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
