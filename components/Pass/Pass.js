import useStyles from "./styles";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Container,
  Grow
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { pass } from "../../actions/auth";
import { useHistory } from "react-router-dom";
import Input from "./Input";

const Pass = ({ setCurrentId }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const classes = useStyles();
  const [postData, setPostData] = useState({
    creator: user?.result.name,
    email: user?.result.email,
    CIN: user?.result.CIN,
    CNE: user?.result.CNE,
    Apo: user?.result.Apo,
    password: "",
    confirmPassword: ""
  });
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    if (!(postData.password === postData.confirmPassword)) {
      alert("Passwords don't match, please re-check them.");
    } else {
      await dispatch(pass(postData, history));
    }
    history.push("/dashboard");
  };

  const handleChange = (e) =>
    setPostData({ ...postData, [e.target.name]: e.target.value });

  return (
    <Grow in>
      <Container>
        <Grid container justify="center" alignItems="stretch">
          <Grid item xs={12} sm={12}>
            <Paper className={classes.paper}>
              <form
                autoComplete="off"
                className={`${classes.root} ${classes.form}`}
                onSubmit={handleSubmit}
              >
                <Typography
                  variant="h6"
                  color="secondary"
                  className={classes.header}
                >
                  Account Settings
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="filled"
                      disabled
                      fullWidth
                      id="firstName"
                      label="Full Name"
                      value={postData.creator}
                      onChange={(e) =>
                        setPostData({ ...postData, creator: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="filled"
                      disabled
                      fullWidth
                      id="CIN"
                      label="CIN"
                      name="CIN"
                      value={postData.CIN}
                      onChange={(e) =>
                        setPostData({ ...postData, CIN: e.target.value })
                      }
                      autoComplete="CIN"
                    />
                  </Grid>
                  {!user.result.isAll &&
                    !user.result.isAdmin &&
                    !user.result.isProf &&
                    !user.result.isResp && (
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="filled"
                          disabled
                          fullWidth
                          id="CNE"
                          label="CNE"
                          name="CNE"
                          value={postData.CNE}
                          onChange={(e) =>
                            setPostData({ ...postData, CNE: e.target.value })
                          }
                          autoComplete="CNE"
                        />
                      </Grid>
                    )}
                  {!user.result.isAll &&
                    !user.result.isAdmin &&
                    !user.result.isProf &&
                    !user.result.isResp && (
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant="filled"
                          disabled
                          fullWidth
                          id="Apo"
                          label="Apo"
                          name="Apo"
                          value={postData.Apo}
                          onChange={(e) =>
                            setPostData({ ...postData, Apo: e.target.value })
                          }
                          autoComplete="Apo"
                        />
                      </Grid>
                    )}
                  <Grid item xs={12} sm={12}>
                    <Input
                      name="password"
                      label="New Password"
                      handleChange={handleChange}
                      type={showPassword ? "text" : "password"}
                      handleShowPassword={handleShowPassword}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Input
                      name="confirmPassword"
                      label="Repeat New Password"
                      handleChange={handleChange}
                      type="password"
                    />
                  </Grid>
                  <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={isPending}
                    type="submit"
                    fullWidth
                  >
                    {isPending ? "Submitting.." : "Submit"}
                  </Button>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Pass;
