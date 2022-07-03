import { useState } from "react";
import { useDispatch } from "react-redux";
import { enable } from "../../actions/auth";
import { useParams, useHistory } from "react-router-dom";

const Enable = () => {
  const { id } = useParams();
  const [postData, setPostData] = useState({
    enable: id
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async () => {
    await dispatch(enable(postData, history));
    history.push("/");
  };

  return <button onClick={handleSubmit}>Enable</button>;
};

export default Enable;
