import { Provider } from 'react-redux';
import {store} from '../src/Store/store';
import './App.css';
import EmployeeProfile from './component/EmployeeProfile/employeeProfile';
import UserProfile from './component/UserProfile/userProfile';

function App() {
  return (
    <Provider store={store}>
      <UserProfile userId={21} />
      <EmployeeProfile id={21}/>
    </Provider>
  );
}

export default App;

