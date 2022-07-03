import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Container,
  Grow
} from "@material-ui/core";
import usestyles from "../Pass/styles";
import { useHistory } from "react-router-dom";
import Input from "./Input";

const Setting = () => {
  const { index } = useParams();
  const [Data, setData] = useState({});
  const [postData, setPostData] = useState({
    email: "",
    name: "",
    CIN: "",
    CNE: "",
    Apo: "",
    isEnable: "",
    isAdmin: "",
    isProf: "",
    isResp: "",
    password: "",
    confirmPassword: ""
  });
  const classes = usestyles();
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://kgziu.sse.codesandbox.io/posts/all");

      await setData(result.data[parseInt(index)]);
      await setPostData({
        email: Data.email,
        name: Data.name,
        CIN: Data.CIN,
        CNE: Data.CNE,
        Apo: Data.Apo,
        isEnable: Data.isEnable,
        isAdmin: Data.isAdmin,
        isProf: Data.isProf,
        isResp: Data.isResp,
        password: Data.re,
        confirmPassword: Data.re
      });
    };

    fetchData();
  }, [Data.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    if (!(postData.password === postData.confirmPassword)) {
      alert("Passwords don't match, please re-check them.");
    } else {
      await axios
        .post("https://kgziu.sse.codesandbox.io/user/account", postData)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    history.push("/acc");
  };

  const handleChange = (e) =>
    setPostData({ ...postData, [e.target.name]: e.target.value });

  return (
    <Grow in>
      <Container>
        <Grid container justify="center" alignItems="stretch">
          <Grid item xs={12} sm={4}>
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
                  <Grid item xs={12} sm={12}>
                    <TextField
                      disabled
                      autoComplete="email"
                      name="email"
                      variant="outlined"
                      fullWidth
                      id="email"
                      label={Data.email}
                      value={postData.email}
                      onChange={(e) =>
                        setPostData({ ...postData, email: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="name"
                      variant="outlined"
                      fullWidth
                      id="name"
                      label={Data.name}
                      value={postData.name}
                      onChange={(e) =>
                        setPostData({ ...postData, name: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="CIN"
                      label={Data.CIN}
                      name="CIN"
                      value={postData.CIN}
                      onChange={(e) =>
                        setPostData({ ...postData, CIN: e.target.value })
                      }
                      autoComplete="CIN"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="CNE"
                      label={Data.CNE}
                      name="CNE"
                      value={postData.CNE}
                      onChange={(e) =>
                        setPostData({ ...postData, CNE: e.target.value })
                      }
                      autoComplete="CNE"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="Apo"
                      label={Data.Apo}
                      name="Apo"
                      value={postData.Apo}
                      onChange={(e) =>
                        setPostData({ ...postData, Apo: e.target.value })
                      }
                      autoComplete="Apo"
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <Input
                      name="password"
                      label="New Password"
                      value={postData.password}
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

export default Setting;
