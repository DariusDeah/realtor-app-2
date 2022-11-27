import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { User } from "../models/user";
import { UserDTO } from "../models/userDTO";
import { login, signup } from "../utils/requests";
import { RootState } from "./store";
import jwt_decode from "jwt-decode";

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
    location: {
      zipcode: string;
      state: string;
      city: string;
      address: string;
    };
    housingPreferences: {
      type: string;
      budget: {
        min: number;
        max: number;
      };
      bedrooms: number;
      bathrooms: number;
    };
  } | null;
  success: boolean | null;
  error: {
    message: string | null;
  } | null;
}

const initialState: UserState = {
  user: null,
  success: null,
  error: null,
};

export const signUpUser = createAsyncThunk(
  "account/signup",
  async (userData: any) => {
    const reqBody = new UserDTO(userData);
    const res = await signup({ ...reqBody });
    return res;
  }
);

export const loginUser = createAsyncThunk(
  "account/login",
  async (userData: any) => {
    const res = await login(userData);
    return res;
  }
);

export const refreshUser = createAsyncThunk("account/refresh", () => {
  const decodedUser = jwt_decode(document.cookie);
  return decodedUser;
});

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
      (state, action: PayloadAction<AxiosResponse>) => {
        const parsedRes: AxiosResponse<User & UserDTO> = JSON.parse(
          action.payload.data
        );
        state.user = { ...new User(parsedRes.data) };
      }
    );
    builder.addCase(
      signUpUser.rejected,
      (state, action: PayloadAction<AxiosResponse | any>) => {
        state.error = {
          message: action.payload.status,
        };
      }
    );

    builder.addCase(
      refreshUser.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.user = { ...new User(action.payload) };
      }
    );

    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<AxiosResponse | any>) => {
        state.success = true;
        state.user = { ...new User(action.payload.data) };
      }
    );

    builder.addCase(
      loginUser.rejected,
      (state, action: PayloadAction<AxiosResponse | any>) => {
        state.error = {
          message: action.payload,
        };
      }
    );
  },
});

export const { signIn } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user;
