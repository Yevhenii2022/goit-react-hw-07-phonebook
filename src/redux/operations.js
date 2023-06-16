import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { showErrorMessage, showSuccessMessage } from '../utils/notifications';

axios.defaults.baseURL = 'https://648affc717f1536d65ea1aff.mockapi.io';

export const fetchContacts = createAsyncThunk(
  'contacts/featchAll',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/contacts');
      return data;
    } catch (error) {
      showErrorMessage(error.message || 'Something went wrong...');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const { data } = await axios.post('/contacts', contact);
      showSuccessMessage(
        `New contact "${contact.name}" has been added in your phone book`
      );
      return data;
    } catch (error) {
      showErrorMessage(error.message || 'Something went wrong...');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/contacts/${id}`);
      showErrorMessage(`You have deleted a contact "${data.name}"`);
      return data;
    } catch (error) {
      showErrorMessage(error.message || 'Something went wrong...');
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
