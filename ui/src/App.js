import { SWRConfig } from 'swr';

import request from './libs/request';
import { GlobalStoreProvider } from './context/GlobalStore';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <SWRConfig value={{ fetcher: request }}>
      <GlobalStoreProvider>
        <Dashboard />
      </GlobalStoreProvider>
    </SWRConfig>
  );
}
