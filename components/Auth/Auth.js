import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Grow,
  FormGroup,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import { signin, signup, setting } from "../../actions/auth";
import useStyles from "./styles";
import Input from "./Input";

import { withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";

const Types = [
  "Student",
  "Professor",
  "Responsible",
  "Administrator",
  "Administration"
];

const Prot = ["CNE", "Apo"];

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(0)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 20,
    padding: "15px 26px 15px 10px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

let initialState = {
  firstName: "",
  lastName: "",
  CIN: "",
  CNE: "",
  Apo: "",
  email: "",
  password: "",
  confirmPassword: "",
  Module: "",
  isAdmin: false,
  isProf: false,
  isResp: false,
  isAll: false
};

const SignUp = ({ admin = false }) => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(admin);
  const [isAdmin, setIsAdmin] = useState(true);
  const [isPassword, setIsPassword] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [Type, setType] = useState("Student");

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
    setIsPassword(false);
  };

  const passwordMode = () => {
    setForm(initialState);
    setIsPassword((prevIsSignup) => !prevIsSignup);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      if (!(form.password === form.confirmPassword)) {
        alert("Passwords don't match, please re-check them.");
      } else {
        dispatch(signup(form, history));
      }
    } else if (isPassword) {
      dispatch(setting(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdministratorChange = (event) => {
    setIsAdmin(event.target.checked);
    setForm({ ...form, isAdmin: !!isAdmin });
  };

  const handleChanges = async (e) => {
    if (e.target.value === "Administration") {
      setForm({
        ...form,
        isAdmin: true,
        isProf: false,
        isResp: false,
        isAll: false
      });
    } else if (e.target.value === "Professor") {
      setForm({
        ...form,
        isAdmin: false,
        isProf: true,
        isResp: false,
        isAll: false
      });
    } else if (e.target.value === "Responsible") {
      setForm({
        ...form,
        isAdmin: false,
        isProf: false,
        isResp: true,
        isAll: false
      });
    } else if (e.target.value === "Administrator") {
      setForm({
        ...form,
        isAdmin: false,
        isProf: false,
        isResp: false,
        isAll: true
      });
    } else {
      setForm({
        ...form,
        isAdmin: false,
        isProf: false,
        isResp: false,
        isAll: false
      });
    }
    setType(e.target.value);
    e.preventDefault();
  };

  return (
    <Grow in>
      <Container>
        <Grid container justify="center" alignItems="stretch">
          <Grid item xs={12} sm={6}>
            <Container component="main">
              <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  {isSignup
                    ? "Sign up"
                    : isPassword
                    ? "Forgot password"
                    : "Sign in"}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container spacing={2}>
                    {isSignup && (
                      <>
                        <Grid item xs={12} sm={6}>
                          <Typography
                            variant="h6"
                            color="secondary"
                            className={classes.header}
                          >
                            <FormControl className={classes.margin}>
                              <InputLabel id="demo-customized-select-label"></InputLabel>
                              <Select
                                labelId="demo-customized-select-label"
                                id="demo-customized-select"
                                value={Type}
                                onChange={handleChanges}
                                input={<BootstrapInput />}
                              >
                                <MenuItem value="Type">
                                  <em>Type</em>
                                </MenuItem>
                                {Types.map((type, i) => (
                                  <MenuItem key={"type" + i} value={type}>
                                    {type}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Typography>
                        </Grid>
                        <Input
                          name="firstName"
                          label="First Name"
                          handleChange={handleChange}
                          autoFocus
                          half
                        />
                        <Input
                          name="lastName"
                          label="Last Name"
                          handleChange={handleChange}
                          half
                        />
                        <Input
                          name="CIN"
                          label="CIN"
                          handleChange={handleChange}
                          half
                        />
                        {Type === "Student" ? (
                          Prot.map((type, i) => (
                            <Input
                              key={"type" + i}
                              name={type}
                              label={type}
                              handleChange={handleChange}
                              half
                            />
                          ))
                        ) : Type === "Professor" ? (
                          <Input
                            name="Module"
                            label="Module (separate by comma)"
                            handleChange={handleChange}
                          />
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                    <Input
                      name="email"
                      label="Email Address"
                      handleChange={handleChange}
                      type="email"
                    />
                    {!isPassword && (
                      <Input
                        name="password"
                        label="Password"
                        handleChange={handleChange}
                        type={showPassword ? "text" : "password"}
                        handleShowPassword={handleShowPassword}
                      />
                    )}
                    {isSignup && (
                      <Input
                        name="confirmPassword"
                        label="Repeat Password"
                        handleChange={handleChange}
                        type="password"
                      />
                    )}
                    {admin && (
                      <FormGroup>
                        <Grid
                          component="label"
                          container
                          alignItems="center"
                          spacing={1}
                        >
                          <Grid item className={classes.Administrator}>
                            Administrator
                          </Grid>
                          <FormControlLabel
                            control={
                              <Switch
                                name="isAdmin"
                                checked={isAdmin}
                                onChange={handleAdministratorChange}
                                aria-label="administrator switch"
                              />
                            }
                          />
                        </Grid>
                      </FormGroup>
                    )}
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    {isSignup ? "Sign up" : isPassword ? "Send" : "Sign in"}
                  </Button>

                  {!admin && (
                    <>
                      <Grid container justify="flex-end">
                        <Grid item>
                          <Button onClick={switchMode}>
                            {isSignup
                              ? "Already have an account? Sign in"
                              : "Don't have an account? Sign Up"}
                          </Button>
                        </Grid>
                      </Grid>
                    </>
                  )}
                  {!isSignup && (
                    <Grid container justify="flex-end">
                      <Grid item>
                        <Button onClick={passwordMode}>
                          Forgotten password?
                        </Button>
                      </Grid>
                    </Grid>
                  )}
                </form>
              </Paper>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default SignUp;
