const BASE_API_PREFIX = '/api';

export default async function request(resource, config) {
  const res = await fetch(BASE_API_PREFIX + resource, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  });

  if (!res.ok && res.status === 500) {
    const error = new Error('An error occurred while making the request.');

    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
}
