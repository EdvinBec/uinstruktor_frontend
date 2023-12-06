import { createSlice } from "@reduxjs/toolkit";

type SidebarState = {
  isOpen: boolean;
};

const initialState: SidebarState = {
  isOpen: false,
};

export const SidebarStatus = createSlice({
  name: "SidebarStatus",
  initialState,
  reducers: {
    toggle: (state) => {
      if (state.isOpen) {
        state.isOpen = false;
      } else {
        state.isOpen = true;
      }
    },
  },
});

export const { toggle } = SidebarStatus.actions;

export default SidebarStatus.reducer;
