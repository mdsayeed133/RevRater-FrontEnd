import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployeeById } from '../../Stores/employeeSlice';

function EmployeeProfile({ id }) {
  const dispatch = useDispatch();
  const employee = useSelector((state) => state.employees.employee);

  useEffect(() => {
    dispatch(getEmployeeById(id));
  }, [dispatch, id]);

if (!employee ) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{employee.firstName} {employee.lastName}</h1>
      <p>Email: {employee.author.email}</p>
      <p>Department: {employee.department.title}</p>
    </div>
  );
}

export default EmployeeProfile;