import firebase, { database } from "../config/firebase-api";

export const register = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_LOADING", value: true });
  return firebase
    .auth()
    .createUserWithEmailAndPassword(data.email, data.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      dispatch({ type: "CHANGE_LOADING", value: false });
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode, errorMessage);
      dispatch({ type: "CHANGE_LOADING", value: false });
    });
};

export const login = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_LOADING", value: true });
  return firebase
    .auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user.uid);
      dispatch({ type: "CHANGE_LOADING", value: false });
      localStorage.setItem("isLogin", true);
      localStorage.setItem("user_id", user.uid);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode, errorMessage);
      dispatch({ type: "CHANGE_LOADING", value: false });
      localStorage.setItem("isLogin", false);
      localStorage.setItem("user_id", null);
    });
};

export const addTodo = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_LOADING", value: true });
  return database.ref(`/${data.user_id}`).push(
    {
      title: data.title,
      content: data.content,
    },
    (error) => {
      if (error) {
        // The write failed...
        console.log(error);
        dispatch({ type: "CHANGE_LOADING", value: false });
      } else {
        // Data saved successfully!
        console.log("succes");
        dispatch({ type: "CHANGE_LOADING", value: false });
      }
    }
  );
};

export const getTodo = () => (dispatch) => {
  dispatch({ type: "CHANGE_TODO_LOADING", value: true });
  return database
    .ref(`/${localStorage.getItem("user_id")}`)
    .on("value", (snapshot) => {
      const todos = [];
      if (snapshot.val() !== null) {
        Object.keys(snapshot.val()).map((e) => {
          todos.push({
            id: e,
            data: snapshot.val()[e],
          });
          return <div></div>;
        });
      }
      dispatch({
        type: "GET_TODO",
        value: todos,
      });
      dispatch({ type: "CHANGE_TODO_LOADING", value: false });
    });
};

export const deleteTodo = (id) => (dispatch) => {
  return database
    .ref(`/${localStorage.getItem("user_id")}/${id}`)
    .remove((error) => {
      if (error) {
        // The write failed...
        console.log(error);
      } else {
        // Data saved successfully!
        console.log("succes");
      }
    });
};

export const updateTodo = (data) => (dispatch) => {
  dispatch({ type: "CHANGE_LOADING", value: true });
  return database.ref(`/${localStorage.getItem("user_id")}/${data.id}`).set(
    {
      title: data.title,
      content: data.content,
    },
    (error) => {
      if (error) {
        dispatch({ type: "CHANGE_LOADING", value: false });
        // The write failed...
        console.log(error);
      } else {
        dispatch({ type: "CHANGE_LOADING", value: false });
        // Data saved successfully!
        console.log("succes");
      }
    }
  );
};

export const detailTodo = (id) => (dispatch) => {
  dispatch({ type: "CHANGE_LOADING", value: true });
  return database
    .ref(`/${localStorage.getItem("user_id")}/${id}`)
    .on("value", (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      dispatch({
        type: "DETAIL_TODO",
        value: data,
      });
      dispatch({ type: "CHANGE_LOADING", value: false });
    });
};
