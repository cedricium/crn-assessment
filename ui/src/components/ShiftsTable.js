import { useCallback } from 'react';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { formatDate, formatNurseName } from '../utils';
import { useGlobalStore } from '../context/GlobalStore';

export default function ShiftsTable() {
  const { shifts, shiftsError, nurses } = useGlobalStore();

  const getNurseInfo = (nurseId) => {
    const matchingNurse = nurses?.find((nurse) => nurse.id === nurseId);
    return matchingNurse ? formatNurseName(matchingNurse) : nurseId;
  };

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
              <TableCell>{formatDate(row.start)}</TableCell>
              <TableCell>{formatDate(row.end)}</TableCell>
              <TableCell>{row.qual_required}</TableCell>
              <TableCell>{getNurseInfo(row.nurse_id)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
