import { useState } from "react";
import { connect } from "react-redux";
import { register } from "../../reducer/action";
const Register = ({ dataUser, register, loading, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const submit = (data) => {
    register(data);
    setPass("");
    setEmail("");
  };
  console.log(loading);
  return (
    <div className="row d-flex justify-content-center">
      <div className="registerCard shadow-sm p-3 mb-5 bg-body rounded col-4">
        <h3 className="text-center">Register page</h3>
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
            register
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
  register: (registerData) => dispatch(register(registerData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
