const ActionType = {
  SHOW_LOADING: 'SHOW_LOADING'
};

function showLoadingSpiner(loading) {
  return {
    type: ActionType.SHOW_LOADING,
    payload: {
      loading
    }
  };
}

export {
  showLoadingSpiner,
  ActionType
};
