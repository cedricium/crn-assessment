import shifts from '../../../data/shift_list.json';

export default function shiftHandler(req, res) {
  const { method, query, body } = req;
  const { id: shiftID } = query;
  const { nurseID } = body;

  switch (method) {
    case 'GET':
      console.info(`Searching for shift ${shiftID}.`);
      const shift = shifts.find((shift) => shift.id == shiftID);

      if (!shift) {
        console.info(`Failed to find shift ${shiftID}.`);
        return res
          .status(404)
          .json({ error: `Shift ${shiftID} does not exist` });
      }

      res.status(200).json(shift);
      console.info(`Successfully delivered shift ${shiftID}.`);
      break;
    case 'PUT':
      console.info(
        `Attempting to save shift ${shiftID} with nurse ${nurseID} assigned to it.`,
      );

      res.status(200).json({
        shiftID,
        nurseID,
      });

      console.info(`Successfully saved the shift ${shiftID}`);
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
