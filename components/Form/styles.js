import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1)
    }
  },
  paper: {
    padding: theme.spacing(2)
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  fileInput: {
    width: "97%",
    margin: "10px 0"
  },
  buttonSubmit: {
    margin: 10,
    verticalAlign: "middle",
    border: "none",
    outline: "none !important",
    cursor: "pointer",
    color: "#fff",
    fontSize: "16px",
    fontWeight: 600,
    textTransform: "uppercase",
    padding: "13.5px 56px",
    borderRadius: "30.5px",
    transition: "all .4s ease",
    width: "auto"
  },
  header: {
    padding: "20px",
    color: "darkgoldenrod"
  }
}));
