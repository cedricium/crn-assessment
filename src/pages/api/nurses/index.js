import nurses from '../../../data/nurse_list.json';

export default function nursesHandler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      console.info('Attempting to send nurse list to requestor');
      res.status(200).json(nurses);
      console.info('Successfully delivered nurse list');
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
