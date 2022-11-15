import { RootState } from "~/store/rootReducer"

export const selectDesigns = (state: RootState) => state.designs.designs
export const selectPublicDesigns = (state: RootState) => state.designs.public
export const selectExistingDesigns = (state: RootState) => state.designs.existing
export const getCurrentDesigns2 = (state: RootState) => state.designs.current



