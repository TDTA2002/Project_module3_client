import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

const findByCategory = createAsyncThunk("/findByCategory", async (category_id) => {
    let result = await api.categories.findByCategory(category_id);
    return result.data;
});

const categorySlice = createSlice({
    name: "category",
    initialState: {
        loading: true,
        data: null
    },
    extraReducers: (builder) => {
        // find product by category
        builder.addCase(findByCategory.fulfilled, (state, action) => {
            state.data = [...action.payload.data];
        });
        builder.addMatcher(
            (action) => {
                if (action.meta) {
                    return action;
                }
            },
            (state, action) => {
                if (action.meta) {
                    if (action.meta.requestStatus == "pending") {
                        //console.log("đã vào pending của api: ", action.type)
                        // if (action.type == "deleteUserByid/pending") {
                        //     console.log("trường hợp pending của api delete")
                        // }
                        state.loading = true;
                    }
                    if (action.meta.requestStatus == "rejected") {
                        //console.log("đã vào rejected của api: ", action.type)
                        state.loading = false;
                    }
                    if (action.meta.requestStatus == "fulfilled") {
                        //console.log("đã vào fulfilled của api: ", action.type)
                        state.loading = false;
                    }
                }
            },
        );
    }
})

export const categoryActions = {
    ...categorySlice.actions,
    findByCategory
}

export const categoryReducer = categorySlice.reducer;