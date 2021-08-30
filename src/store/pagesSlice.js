import { createSlice } from "@reduxjs/toolkit";

const initialPagesState = {
    updating: 'idle',
    activePageNumber: 0,
    rowsPerPage: 5,
};

const pagesSlice = createSlice({
    name: 'pages',
    initialState: initialPagesState,
    reducers: {

        updateActivePageNumber: (state, action) => {
            state.activePageNumber = action.payload;
        },

        updateRowsPerPage: (state, action) => {
            state.rowsPerPage = action.payload;
        },
    },
});

export const {
    updateActivePageNumber,
    updateRowsPerPage
} = pagesSlice.actions;

export default pagesSlice.reducer;