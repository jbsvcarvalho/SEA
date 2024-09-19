import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsersFromApi, addUserToApi, deleteUserFromApi } from '../../api/usersApi';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
  const response = await fetchUsersFromApi();
  return response;
});

export const addUser = createAsyncThunk('employees/addUser', async (employee) => {
  const response = await addUserToApi(employee);
  return response;
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id) => {
  await deleteUserFromApi(id);
  return id;
});

const initialState = {
  list: [],
  status: 'idle',
  error: null,
  filter: 'all',
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.list = state.list.filter(employee => employee.id !== action.payload);
      });
  },
});

export const { setFilter } = employeesSlice.actions;
export default employeesSlice.reducer;
