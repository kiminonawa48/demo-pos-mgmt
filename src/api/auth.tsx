
// const authPth = ""
const apiPaths = {
  todos: "/todos",
  login: "/auth/login",
  userProfile: (userId: string) => `/users/${userId}`,
  updateProfile: "/users/update",
  deleteTodo: (todoId: string) => `/todos/${todoId}`,
  // add more endpoints here
};

export default apiPaths;
