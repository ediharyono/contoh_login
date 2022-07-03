import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { update } from "../../actions/auth";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [re, setRe] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://kgziu.sse.codesandbox.io/posts/all");

      await setData(result.data);
    };

    fetchData();
  }, [re]);

  const Update = async (e) => {
    if (window.confirm("Are you sure?"))
      await dispatch(
        update({
          email: e.value.email,
          isEnable: !e.value.isEnable
        })
      );
    setRe(!re);
  };

  let columns = [];
  columns = [
    { field: "id", hide: true },
    { field: "col1", headerName: "First Name", width: 125 },
    { field: "col2", headerName: "Last Name", width: 125 },
    { field: "col3", headerName: "Email", width: 250 },
    { field: "col4", headerName: "Type", width: 125 },
    {
      field: "col5",
      headerName: "Enable",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="secondary"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => Update(params)}
        >
          {params.value.isEnable ? "enable" : "disable"}
        </Button>
      )
    },
    {
      field: "col6",
      headerName: "Edit",
      width: 150,
      renderCell: (params) => (
        <Button
          component={Link}
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: 16 }}
          to={params.value}
        >
          Edit
        </Button>
      )
    }
  ];

  let rows = [];
  rows = data.map((obj, index) => {
    return (rows = {
      id: index,
      col1: obj.name.split(" ")[0],
      col2: obj.name.split(" ")[1],
      col3: obj.email,
      col4: obj.isAdmin
        ? "Administration"
        : obj.isProf
        ? "Professor"
        : obj.isResp
        ? "Responsible"
        : obj.isAll
        ? "Administrator"
        : "Student",
      col5: { email: obj.email, isEnable: obj.isEnable },
      col6: "/setting/" + index
    });
  });

  return (
    <div style={{ height: 590, width: "100%", backgroundColor: "white" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}
