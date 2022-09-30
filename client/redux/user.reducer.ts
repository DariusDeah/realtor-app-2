import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { User } from "../models/user";
import { UserDTO } from "../models/userDTO";
import { login, signup } from "../utils/requests";
import { RootState } from "./store";

interface UserState {
  user: {
    id: string;
    fullName: string;
    email: string;
    photoUrl: string;
    favoriteHomes?: any[];
    membershipStatus: "premium" | "base";
    recentlyViewed?: any[];
    timezone: string;
    zipcode: string;
    state: string;
    housingPreference: "House" | "Apartment";
  } | null;
  success?: boolean | null;
  error?: boolean | null;
}

const initialState: UserState = {
  user: null,
  success: null,
  error: null,
};

export const signUpUser = createAsyncThunk(
  "account/signup",
  async (userData: any, thunkApi) => {
    const reqBody = new UserDTO(userData);
    const res = await signup({ ...reqBody });
    return res.data;
  }
);
const loginUser = createAsyncThunk(
  "account/login",
  async (userData: any, thunkApi) => {
    const reqBody = new UserDTO({ ...userData });
    const res = await login({ ...reqBody });
    return res.data;
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<User & UserDTO>) => {
      state.user = { ...new User(action.payload) };
      state.success = true;
    },
    // change to async await
  },
  extraReducers: (builder) => {
    builder.addCase(
      signUpUser.fulfilled,
      (state, action: PayloadAction<string>) => {
        const parsedRes: AxiosResponse<User & UserDTO> = JSON.parse(
          action.payload
        );
        state.user = { ...new User(parsedRes.data) };
      }
    );
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<string>) => {
        const parsedRes: AxiosResponse<User | any> = JSON.parse(action.payload);
        state.user = { ...new User(parsedRes.data) };
      }
    );
  },
});

export const { signIn } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user;
