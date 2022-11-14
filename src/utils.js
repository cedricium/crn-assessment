export const formatDate = (date) => new Date(date).toLocaleString();

export const formatNurseName = ({ first_name, last_name, qualification }) =>
  `${first_name} ${last_name}, ${qualification}`;
