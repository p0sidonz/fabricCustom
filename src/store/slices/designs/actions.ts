import { createAsyncThunk, createAction } from "@reduxjs/toolkit"
import { IDesign } from "~/interfaces/DesignEditor"
import api from "~/services/api"

export const setDesign = createAction<IDesign>("designs/setDesign")
export const setPublicDesigns = createAction<IDesign[]>("designs/setPublicDesigns")
export const setExistingDesigns = createAction<IDesign[]>("designs/setExistingDesigns")
export const unsetDesign = createAction<{ id: string }>("designs/unsetDesign")

export const getPublicDesigns = createAsyncThunk<void, never, { rejectValue: Record<string, string[]> }>(
  "designs/getPublicDesigns",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const designs = await api.getPublicDesigns()
      dispatch(setPublicDesigns(designs))
    } catch (err) {
      return rejectWithValue((err as any).response?.data?.error.data || null)
    }
  }
)
export const getExistingDesigns = createAsyncThunk<void, never, { rejectValue: Record<string, string[]> }>(
  "designs/getExistingDesigns",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const designs = await api.getExistingDesigns()
      dispatch(setExistingDesigns(designs))
    } catch (err) {
      return rejectWithValue((err as any).response?.data?.error.data || null)
    }
  }
)

export const addToExistingDesign = createAction("designs/addToExistingDesign")
export const setCurrentDesign2 = createAction("designs/setCurrentDesign2")

