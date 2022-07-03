import React, { useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core/";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import { deletePost } from "../../actions/post";
import moment from "moment";

export default function Dashboard() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const posts = useSelector((state) =>
    user.result.isAll
      ? state.posts
      : user.result.isAdmin
      ? state.posts.filter((post) => post.forAdmin && !post.isDel)
      : user.result.isProf
      ? state.posts.filter(
          (post) =>
            post.forProf &&
            user.result.Module.includes(post.module) &&
            !post.isDel
        )
      : user.result.isResp
      ? state.posts.filter((post) => !post.isDel)
      : state.posts.filter(
          (post) => post.email === user.result.email && !post.isArch
        )
  );
  const type = user.result.isAdmin
    ? "Admin"
    : user.result.isProf
    ? "Prof"
    : "Student";

  const Delete = async (e) => {
    if (window.confirm("Are you sure?"))
      await dispatch(deletePost(e.value.id, e.value));
  };

  let columns = [];
  columns = [
    { field: "id", hide: true },
    { field: "col1", headerName: "First Name", width: 125 },
    { field: "col2", headerName: "Last Name", width: 125 },
    { field: "col3", headerName: "Email", width: 250 },
    { field: "col4", headerName: "For", width: 200 },
    { field: "col5", headerName: "Time", width: 125 },
    { field: "col6", headerName: "State", width: 125 },
    { field: "col7", headerName: "Faculty", width: 125 },
    {
      field: "col8",
      headerName: "Show",
      width: 125,
      renderCell: (params) => (
        <Button
          component={Link}
          variant="contained"
          color="primary"
          size="small"
          to={params.value}
        >
          Show
        </Button>
      )
    },
    {
      field: "col9",
      headerName: "Delete",
      width: 150,
      renderCell: (params) =>
        !user.result.isResp && (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => Delete(params)}
          >
            Delete
          </Button>
        )
    }
  ];

  let rows = [];
  rows = posts.map((post, index) => {
    return (rows = {
      id: index,
      col1: post.creator.split(" ")[0],
      col2: post.creator.split(" ")[1],
      col3: post.email,
      col4: post.DR + " for " + post.TDR,
      col5: moment(post.createAt).fromNow(),
      col6: post.state ? "Pending" : "Resolved",
      col7: post.Faculty,
      col8: "/details/" + post._id,
      col9: !user.result.isResp ? { id: post._id, type: type } : "Resp can not"
    });
  });

  return (
    <div style={{ height: 590, width: "100%", backgroundColor: "white" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
