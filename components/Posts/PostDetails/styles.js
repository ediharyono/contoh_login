import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1)
    }
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2)
  },
  mainContainer: {
    display: "flex",
    alignItems: "center"
  },
  smMargin: {
    margin: theme.spacing(1)
  },
  actionDiv: {
    textAlign: "center"
  },
  title: {
    marginTop: "20px",
    textAlign: "center",
    color: "black"
  },
  creator: {
    textAlign: "left",
    color: "black"
  },
  createdAt: {
    textAlign: "left",
    color: "black"
  },
  content: {
    marginTop: "25px",
    padding: "25px",
    width: "100%",
    height: "auto",
    color: "black"
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
  }
}));
