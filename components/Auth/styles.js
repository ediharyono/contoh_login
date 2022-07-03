import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2)
  },
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1)
    }
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "darkgoldenrod"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
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
  googleButton: {
    marginBottom: theme.spacing(2)
  },
  Administrator: {
    margin: "15px",
    fontWeight: "bold"
  }
}));
