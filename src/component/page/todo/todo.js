import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addTodo, getTodo, deleteTodo, updateTodo } from "../../reducer/action";

const Todo = ({
  addTodo,
  loading,
  getTodo,
  todos,
  todoLoading,
  updateTodo,
  history,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [todoId, setTodoId] = useState("");
  const [updateBtn, setUpdateBtn] = useState(false);
  useEffect(() => {
    getTodo();
  }, [getTodo]);
  const submit = (data) => {
    addTodo(data);
    setContent("");
    setTitle("");
  };
  const toInput = (data) => {
    setTitle(data.title);
    setTodoId(data.id);
    setContent(data.content);
    setUpdateBtn(true);
  };
  const update = (data) => {
    updateTodo(data);
    setTitle("");
    setTodoId("");
    setContent("");
    setUpdateBtn(false);
  };
  const cancelUpdate = () => {
    setTitle("");
    setTodoId("");
    setContent("");
    setUpdateBtn(false);
  };
  console.log(todoLoading);
  return (
    <div className="row d-flex justify-content-center">
      <div className="text-center col-12 alert alert-success ">
        <h5>Todo App</h5>
      </div>
      <div className="margin1 col-4">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="lbl form-label">
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea1" class="lbl form-label">
            content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        {loading === false && updateBtn === false && (
          <button
            onClick={() =>
              submit({
                title: title,
                content: content,
                user_id: localStorage.getItem("user_id"),
              })
            }
            className="btn btn-success col-12"
          >
            Add
          </button>
        )}
        {loading === false && updateBtn === true && (
          <div>
            <button
              onClick={() =>
                update({
                  title: title,
                  content: content,
                  id: todoId,
                })
              }
              className="btn btn-warning col-12"
            >
              Update
            </button>
            <button
              onClick={() => cancelUpdate()}
              className="cancelUpdt btn btn-danger col-12"
            >
              Cancel
            </button>
          </div>
        )}
        {loading === true && (
          <button className="btn btn-light col-12">loading...</button>
        )}
      </div>
      <div className="margin1 col-7">
        <div className="hdrList text-center col-12">List</div>
        <ul class="list-group">
          {todoLoading === true && (
            <li class="emptyList list-group-item d-flex justify-content-center align-items-center row">
              Loading...
            </li>
          )}
          {todos.length === 0 && todoLoading === false && (
            <li class="emptyList list-group-item d-flex justify-content-center align-items-center row">
              List empty
            </li>
          )}
          {todos &&
            todos.reverse().map((e) => {
              return (
                <li class="list-group-item d-flex justify-content-between align-items-center row">
                  <div className="col-7">{e.data.title}</div>
                  <div className="col-5 row d-flex justify-content-end">
                    <button
                      onClick={() => history.push(`/${e.id}`)}
                      class="delBtn btn-success"
                    >
                      view
                    </button>
                    <button
                      onClick={() =>
                        toInput({
                          id: e.id,
                          title: e.data.title,
                          content: e.data.content,
                        })
                      }
                      class="delBtn btn-warning"
                    >
                      edit
                    </button>
                    <button
                      onClick={deleteTodo(e.id)}
                      class="delBtn btn-danger"
                    >
                      delete
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.reducer.loading,
  todos: state.reducer.todos,
  todoLoading: state.reducer.todoLoading,
});

const mapDispatchToProps = (dispatch) => ({
  addTodo: (todo) => dispatch(addTodo(todo)),
  getTodo: () => dispatch(getTodo()),
  updateTodo: (data) => dispatch(updateTodo(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Todo);
