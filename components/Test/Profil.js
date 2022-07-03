import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Grow, Container, Grid } from "@material-ui/core";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 50,
    marginBottom: 50
  }
}));

const useStyles = makeStyles({
  root: {
    minWidth: 500,
    width: 870,
    maxWidth: 1500,
    backgroundImage:
      'url("https://www.comet.ml/site/app/uploads/2020/01/Home-page-hero-bg-min-1.jpg")'
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    color: "grey",
    fontSize: 20
  },
  header: {
    marginTop: "25px",
    color: "black"
  },
  graph: {
    marginBottom: "5px",
    color: "white"
  }
});

const useAccount = makeStyles((theme) => ({
  root: {
    float: "left",
    "& > *": {
      margin: theme.spacing(1)
    },
    margin: "150px 100px"
  }
}));

function AccountAvatars() {
  const classes = useAccount();

  return (
    <div className={classes.root}>
      <img
        alt="Profil"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv9eO0YWJFRxE-frmQTzVvR7D6czdgAkYnMQ&usqp=CAU"
      />
    </div>
  );
}

export default function Home() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const classes = useStyles();
  const classe = useStyle();

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

  return (
    <div className={classe.root}>
      <Grow in>
        <Container>
          <Grid container justify="center" alignItems="stretch">
            <Grid item xs={9}>
              <Card className={classes.root}>
                <AccountAvatars />
                <Typography
                  variant="h3"
                  component="h1"
                  className={classes.header}
                >
                  <AssignmentIndIcon style={{ fontSize: 40 }} /> Your Profil
                </Typography>
                <CardContent>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Email
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.graph}
                  >
                    {user.result.email}
                  </Typography>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Full Name
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.graph}
                  >
                    {user.result.name}
                  </Typography>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    CIN
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.graph}
                  >
                    {user.result.CIN}
                  </Typography>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    CNE
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.graph}
                  >
                    {user.result.CNE}
                  </Typography>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Apo
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.graph}
                  >
                    {user.result.Apo}
                  </Typography>
                  <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                  >
                    Claim
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h2"
                    className={classes.graph}
                  >
                    {posts.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
}
