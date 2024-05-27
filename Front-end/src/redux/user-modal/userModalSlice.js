import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  role: "",
};
export const userModalSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { name, role } = action.payload;
      state.name = name;
      state.role = role;
      sessionStorage.setItem('user', JSON.stringify(action.payload));
    },
    removeUser: (state, action) => {
      state.name = "";
      state.role = "";
      sessionStorage.removeItem('user');
    }
  },
});

export const { setUser, removeUser } = userModalSlice.actions;
export default userModalSlice.reducer;
