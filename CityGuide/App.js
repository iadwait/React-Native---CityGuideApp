import AppNavigation from './src/AppNavigation';
import { Provider } from 'react-redux';
import store from './src/Redux/Store/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}