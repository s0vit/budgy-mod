import { createSlice } from '@reduxjs/toolkit';
import { LoginOutputDto } from '../../../api/budgyApi.ts';
import { SLICE_NAMES } from '../../../store/SLICE_NAMES.ts';

type TUser = LoginOutputDto;

type TUserSliceType = {
  user: TUser | null;
};

const initialState: TUserSliceType = {
  user: null,
};

export const userSlice = createSlice({
  name: SLICE_NAMES.USER,
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    resetState: () => {
      return initialState;
    },
  },
  selectors: {
    selectUser: (sliceState) => sliceState.user,
  },
});

export const { setUser, resetState } = userSlice.actions;
export const { selectUser } = userSlice.selectors;
