import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import listService from './listService'


const initialState = {
    item: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    msg: ''
}


// Create list 
export const createList = createAsyncThunk(
    "list/createList",
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.accessToken;
            const { username, spotifyId, timeRange, type, limit } = data;
            return await listService.createList({ username, spotifyId, timeRange, type, limit, token });
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.msg) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


// Create slice
const listSlice = createSlice({
    name: "list",
    initialState,
    reducers: {
        // Reset state
        resetList: (state) => {
            state.item = null;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        }
    },
    extraReducers: (builder) => {
        // Create list
        builder.addCase(createList.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        });
        builder.addCase(createList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.item = action.payload;
        });
        builder.addCase(createList.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.msg = action.payload;
        });
    }
});


// Export reducer
export const { resetList } = listSlice.actions;
export default listSlice.reducer;