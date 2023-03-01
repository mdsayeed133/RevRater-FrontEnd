import { Provider } from 'react-redux';
import {store} from '../src/Store/store';
import './App.css';
import UserProfile from './component/UserProfile/userProfile';

function App() {
  return (
    <Provider store={store}>
      <UserProfile userId={20} />
    </Provider>
  );
}

export default App;

