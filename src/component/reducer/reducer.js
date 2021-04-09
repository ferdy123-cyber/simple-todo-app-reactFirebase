const inisialstate = {
  todoLoading: false,
  loading: false,
  dataUser: [],
  todos: [],
  DetailTodo: {
    title: "",
    content: "",
  },
};

const reducer = (state = inisialstate, action) => {
  if (action.type === "REGISTER") {
    alert("ok");
    return {
      ...state,
      dataUser: action.value,
    };
  }
  if (action.type === "CHANGE_LOADING") {
    return {
      ...state,
      loading: action.value,
    };
  }
  if (action.type === "CHANGE_TODO_LOADING") {
    return {
      ...state,
      todoLoading: action.value,
    };
  }
  if (action.type === "GET_TODO") {
    return {
      ...state,
      todos: action.value,
    };
  }
  if (action.type === "DETAIL_TODO") {
    console.log(action.value);
    return {
      ...state,
      DetailTodo: action.value,
    };
  }
  return state;
};

export default reducer;
