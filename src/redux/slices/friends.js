import { FIELDS } from "@consts/fields";
import { TOKEN } from "@consts/token";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import $ from 'jquery'


export const fetchFriends = createAsyncThunk("friends/fetchFriends", async (props) => {
  return new Promise((resolve, reject) => {
  const code = `
    var items = API.friends.get({
      "user_id": '${props}',
      "fields": '${FIELDS.friends}'
    });
  `;

  $.ajax({
    url: "https://api.vk.com/method/execute?",
    data: {
      code: `var account; if (${props} < 0) {account = API.groups.getById({"group_id": '${-props}', "fields": '${FIELDS.group}'});} else {account = API.users.get({"user_ids": '${props}', "fields": '${FIELDS.user}'});}; ${code}; return {items: items, account: account};`,
      access_token: TOKEN,
      v: "5.131",
    },
    dataType: "jsonp",
    method: "GET",
    success: (data) => {
      resolve(data.response);
    },
    error: (error) => {
      reject(new Error(error.message));
    },
   }) });
});

const initialState = {
  friends: [],
  status: '',
  error: ''
};

const friends = createSlice({
  name: "friends",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFriends.pending, (state) => {
      state.status = 'pending'
    });
    builder.addCase(fetchFriends.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.friends = action.payload
    });
    builder.addCase(fetchFriends.rejected, (state, action) => {
      state.status = 'error'
      state.error = action.error.message
    });
  },
});

export const { } = friends.actions;

export const friendsReducer = friends.reducer;
