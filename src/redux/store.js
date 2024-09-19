import { configureStore } from '@reduxjs/toolkit';
import processReducer from '../features/process/processSlice';
import employeesReducer from '../features/employees/EmployeesSlice'; 

export const store = configureStore({
  reducer: {
    process: processReducer,
    employees: employeesReducer,
  },
});
