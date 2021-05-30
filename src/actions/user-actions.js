export const setCurrentUser = user => {
  console.log("IN_ACTION ", user);
  return ({
    type: 'SET_CURRENT_USER',
    payload: user
  })
};