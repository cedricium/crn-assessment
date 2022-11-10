import { SWRConfig } from 'swr';

import { GlobalStoreProvider } from './context/GlobalStore';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <SWRConfig
      value={{
        fetcher: async (resource, init) => {
          const res = await fetch(resource, init);

          if (!res.ok) {
            const error = new Error(
              'An error occurred while fetching the data!',
            );

            error.info = await res.json();
            error.status = res.status;
            throw error;
          }

          return res.json();
        },
      }}
    >
      <GlobalStoreProvider>
        <Dashboard />
      </GlobalStoreProvider>
    </SWRConfig>
  );
}
