const QUALIFICATIONS = {
  CNA: 0,
  LPN: 1,
  RN: 2,
};

const isQualified = (desiredShift, desiredNurse) => {
  if (
    QUALIFICATIONS[desiredNurse.qualification] <
    QUALIFICATIONS[desiredShift.qual_required]
  ) {
    return false;
  }

  return true;
};

const isAvailable = (shifts, desiredShift, desiredNurse) => {
  const scheduledShifts = shifts.filter(
    (shift) => shift.nurse_id === desiredNurse.id,
  );

  const hasScheduleConflict = scheduledShifts.some((shift) => {
    const shiftStart = shift.start;
    const shiftEnd = shift.end;
    const desiredStart = desiredShift.start;
    const desiredEnd = desiredShift.end;

    return (
      (shiftStart > desiredStart && shiftStart < desiredEnd) || // shift starts after desired
      (desiredStart > shiftStart && desiredStart < shiftEnd) || // desired starts after shift
      (shiftStart == desiredStart && shiftEnd == desiredEnd) // shifts are identical
    );
  });

  return hasScheduleConflict ? false : true;
};

export default function validate(shifts, desiredShift, desiredNurse) {
  const errors = [];

  if (!isQualified(desiredShift, desiredNurse)) {
    errors.push('This nurse is not qualified to work the chosen shift.');
  }

  if (!isAvailable(shifts, desiredShift, desiredNurse)) {
    errors.push('This nurse is already working during the chosen shift.');
  }

  return errors;
}
