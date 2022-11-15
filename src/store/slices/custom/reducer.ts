import { createReducer } from "@reduxjs/toolkit"
import { changeTemplateMode, savedDesign } from "./actions"

const initialState = {
  isTemplateMode: false,
  savedDesign: {},
}

export const ankitReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeTemplateMode, (state, { payload }) => {
    console.log("change template mode save/on/off")
    state.isTemplateMode = payload
  })
  builder.addCase(savedDesign, (state, { payload }) => {
    console.log("saved design")
    state.savedDesign = payload
  })
})
