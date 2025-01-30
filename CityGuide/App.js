import AppNavigation from './src/AppNavigation';
import { Provider } from 'react-redux';
import store from './src/Redux/Store/store';
import { enableScreens } from 'react-native-screens';

// This enables native screens for performance improvements
enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}