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
    if (
      new Date(shift.end) > new Date(desiredShift.start) ||
      new Date(shift.start) < new Date(desiredShift.end)
    ) {
      return true;
    }
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
