import { Provider } from 'react-redux';
import {store} from '../src/Stores/store';
import './App.css';
import EmployeeProfile from './Components/EmployeeProfile/employeeProfile';
import UserProfile from './Components/UserProfile/userProfile';

function App() {
  return (
    <Provider store={store}>
      <UserProfile userId={21} />
      <EmployeeProfile id={21}/>
    </Provider>
  );
}

export default App;

