import { useEffect } from "react";
import { connect } from "react-redux";
import { detailTodo } from "../../reducer/action";

const DetailTodo = ({ match, detailTodo, DetailTodo, loading }) => {
  useEffect(() => {
    detailTodo(match.params.id);
  }, [detailTodo, match.params.id]);
  console.log(DetailTodo);
  return (
    <div className="row d-flex justify-content-center">
      <div className="col-7 row">
        <div className=" edit hdrList text-center col-12">Detail Todo</div>
        {loading === true && (
          <div className="loadingDetail col-12">Loading...</div>
        )}
        {loading === false && (
          <div className="col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{DetailTodo.title}</h5>
                <p class="card-text">{DetailTodo.content}</p>
                <a href="/" class="right card-link">
                  Go back
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  DetailTodo: state.reducer.DetailTodo,
  loading: state.reducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  detailTodo: (id) => dispatch(detailTodo(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailTodo);
