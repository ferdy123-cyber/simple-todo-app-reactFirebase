import { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { login } from "../../reducer/action";

const Login = ({ loading, login, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const submit = (data) => {
    login(data);
    setPass("");
    setEmail("");
  };

  console.log(loading);
  if (localStorage.getItem("isLogin") === true) {
    return <Redirect to={"/"} />;
  }
  return (
    <div className="row d-flex justify-content-center">
      <div className="registerCard shadow-sm p-3 mb-5 bg-body rounded col-4">
        <h3 className="text-center">Login</h3>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Email address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            class="form-control"
            id="exampleFormControlInput1"
            placeholder="name@example.com"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            class="form-control"
            id="exampleFormControlInput1"
          />
        </div>
        {loading === false && (
          <button
            onClick={() =>
              submit({
                email: email,
                password: password,
              })
            }
            className="btn btn-secondary col"
          >
            login
          </button>
        )}
        {loading === true && (
          <button className="btn btn-light col">loading...</button>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dataUser: state.reducer.dataUser,
  loading: state.reducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  login: (loginData) => dispatch(login(loginData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
