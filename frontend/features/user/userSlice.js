

// get top artists
export const playlist = createAsyncThunk(
    "item/palylist",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().user.user.accessToken;
            return await itemService.playlist(token);
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