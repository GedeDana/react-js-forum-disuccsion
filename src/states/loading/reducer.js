import { ActionType } from './action';

function loadingSpinerReducer(loading = null, action = {}) {
  switch (action.type) {
  case ActionType.SHOW_LOADING:
    return action.payload.loading;
  default:
    return loading;
  }
}
export default loadingSpinerReducer;