import shifts from '../../../data/shift_list.json';

export default function shiftsHandler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      console.info('Attempting to send shift list to requestor');
      res.status(200).json(shifts);
      console.info('Successfully delivered shift list');
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
