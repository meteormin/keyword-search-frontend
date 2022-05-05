export interface LoaderState {
  isLoading: boolean;
}

export const initialState = {
  isLoading: false,
};

export default {
  startLoading: (state: LoaderState) => {
    state.isLoading = true;
  },
  endLoading: (state: LoaderState) => {
    state.isLoading = false;
  },
};
