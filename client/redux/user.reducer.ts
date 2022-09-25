import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Slice,
} from "@reduxjs/toolkit";
import { Axios, AxiosResponse } from "axios";
import { User } from "../models/user";
import { UserDTO } from "../models/userDTO";
import { signup } from "../utils/requests";
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
  };
  success?: boolean | null;
  error?: boolean | null;
}

const initialState: UserState = {
  user: {
    id: "",
    fullName: "",
    email: "",
    photoUrl: "",
    favoriteHomes: [],
    membershipStatus: "base",
    recentlyViewed: [],
    timezone: "",
    zipcode: "",
    state: "",
    housingPreference: "Apartment",
  },
  success: null,
  error: null,
};

// const signUpUser =  createAsyncThunk('user/signup',async(state, action: PayloadAction<UserState>) => {
//     const reqBody = new UserDTO(action.payload);
//     let res;
//     signup({ ...reqBody }).then((data) => {
//       if (data.status === 200) {
//         state = JSON.parse(data.data);
//         state.success = true;
//         res = data;
//       } else {
//         state.error = true;
//         state.success = false;
//       }
//     });

//     return res;
//   })
export const signUpUser = createAsyncThunk(
  "user/signup",
  async (userData: any, thunkApi) => {
    const reqBody = new UserDTO(userData);
    const res = await signup({ ...reqBody });
    return res.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<User>) => {
      state.user = { ...new User(action.payload) };
      state.success = true;
    },
    // change to async await
  },
  extraReducers: (builder) => {
    builder.addCase(
      signUpUser.fulfilled,
      (state, action: PayloadAction<UserState & AxiosResponse>) => {
        console.log(action.payload);
        const parsedRes: AxiosResponse = JSON.parse(action.payload);
        console.log({ parsedRes });
        state.user = parsedRes.data;
        console.log({ state });
      }
    );
  },
});

export const { signIn } = userSlice.actions;
export default userSlice.reducer;
export const selectUser = (state: RootState) => state.user;
