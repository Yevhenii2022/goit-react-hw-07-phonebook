import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

const initialState = {
  contacts: [
    { id: 'id-1', name: 'Alex Hoffman', number: '(067) 488-67-00' },
    { id: 'id-2', name: 'Dan Brown', number: '(066) 100-20-77' },
    { id: 'id-3', name: 'Govard Oldman', number: '(096) 457-56-78' },
    { id: 'id-4', name: 'Tom Clarke', number: '(050) 777-88-11' },
  ],
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: {
      reducer: (state, action) => {
        state.contacts.push(action.payload);
      },
      prepare: (name, number) => {
        return { payload: { id: nanoid(), name, number } };
      },
    },

    deleteContact: {
      reducer(state, action) {
        return {
          contacts: state.contacts.filter(({ id }) => id !== action.payload),
        };
      },
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;
