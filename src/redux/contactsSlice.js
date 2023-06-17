import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { addContact, deleteContact, fetchContacts } from './operations';

const extraActions = [addContact, deleteContact, fetchContacts];

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

// const pending = state => {
//   state.isLoading = true;
// };

// const error = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// };

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // .addCase(fetchContacts.pending, pending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        // state.isLoading = false;
        // state.error = null;
        state.items = action.payload;
      })
      // .addCase(fetchContacts.rejected, error)
      // .addCase(addContact.pending, pending)
      .addCase(addContact.fulfilled, (state, action) => {
        // state.isLoading = false;
        // state.error = null;
        state.items = [...state.items, action.payload];
      })
      // .addCase(addContact.rejected, error)
      // .addCase(deleteContact.pending, pending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        // state.isLoading = false;
        // state.error = null;
        state.items = state.items.filter(({ id }) => id !== action.payload);
      })
      // .addCase(deleteContact.rejected, error)
      .addMatcher(
        isAnyOf(
          ...extraActions.map(action => action.pending)
          // fetchContacts.pending,
          // addContact.pending,
          // deleteContact.pending
        ),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          ...extraActions.map(action => action.rejected)
          // fetchContacts.rejected,
          // addContact.rejected,
          // deleteContact.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          ...extraActions.map(action => action.fulfilled)
          // fetchContacts.fulfilled,
          // addContact.fulfilled,
          // deleteContact.fulfilled
        ),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      );
  },
});

export const contactsReducer = contactsSlice.reducer;
