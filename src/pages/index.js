import { SWRConfig } from 'swr';

import request from '../libs/request';
import { GlobalStoreProvider } from '../context/GlobalStore';

import Dashboard from '../components/Dashboard';

function Home() {
  return (
    <SWRConfig value={{ fetcher: request }}>
      <GlobalStoreProvider>
        <Dashboard />
      </GlobalStoreProvider>
    </SWRConfig>
  );
}

export default Home;
