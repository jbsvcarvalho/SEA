import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    { id: 1, name: 'Item 1', completed: false },
    { id: 2, name: 'Item 2', completed: false },
    { id: 3, name: 'Item 3', completed: false }
  ],
};

const processSlice = createSlice({
  name: 'process',
  initialState,
  reducers: {
    markItemAsCompleted: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.completed = true;
      }
    },
  },
});

export const { markItemAsCompleted } = processSlice.actions;

export default processSlice.reducer;
