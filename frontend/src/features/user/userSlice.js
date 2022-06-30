import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userService from './userService'

// get user from local storage
const user = JSON.parse(localStorage.getItem("user"));
const profile = JSON.parse(localStorage.getItem("profile"));


const initialState = {
    user: user || null,
    profile: profile || null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    msg: ''
}



// Get user
export const getUserProfile = createAsyncThunk(
    "user/getUserProfile",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.accessToken;
            return await userService.getUserProfile(token);
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

// create slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: (state) => {
            state.accessToken = null;
            state.expiresIn = null;
            state.loginTime = null;
            state.user = null;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        },
        setUser: (state, action) => {
            const data = {
                accessToken: action.payload.accessToken,
                expiresIn: action.payload.expiresIn,
                loginTime: Date.now().toString()
            }

            state.user = data;
            localStorage.setItem("user", JSON.stringify(data));
        }
    }, 
    extraReducers: (builder) => {
        builder.addCase(getUserProfile.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
            state.isSuccess = false;
            state.msg = '';
        });
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.profile = action.payload;
            localStorage.setItem("profile", JSON.stringify(action.payload));
        });
        builder.addCase(getUserProfile.rejected, (state, action) => {
            state.isError = true;
            state.user = null;
            state.profile = null;
            localStorage.removeItem("user");
            localStorage.removeItem("profile");
            state.msg = action.payload;
        });
    }
});


// export reducer
export const { resetUser, setUser } = userSlice.actions;
export default userSlice.reducer;