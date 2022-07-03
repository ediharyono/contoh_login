import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import Typography from "@material-ui/core/Typography";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import Avatar from "@material-ui/core/Avatar";
import SchoolIcon from "@material-ui/icons/School";
import { indigo, purple, deepPurple } from "@material-ui/core/colors";
import teacher from "../../images/teacher.svg";
import avatar from "../../images/avatar.jpg";
/* import { Grow, Container, Grid } from "@material-ui/core";
import moment from "moment";
import axios from "axios"; */

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: 50
  }
}));

const useStyles = makeStyles({
  rooti: {
    minWidth: 150,
    maxWidth: 250,
    backgroundColor: indigo[500]
  },
  rootp: {
    minWidth: 150,
    maxWidth: 250,
    backgroundColor: purple[500]
  },
  rootd: {
    minWidth: 150,
    maxWidth: 250,
    backgroundColor: deepPurple[500]
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 20
  }
});

const useMail = makeStyles((theme) => ({
  root: {
    float: "right",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  rounded: {
    color: "#fff",
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: deepPurple[500]
  }
}));

const useAccount = makeStyles((theme) => ({
  root: {
    float: "right",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  rounded: {
    color: "#fff",
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: purple[500]
  }
}));

const useTime = makeStyles((theme) => ({
  root: {
    float: "right",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  rounded: {
    color: "#fff",
    width: theme.spacing(10),
    height: theme.spacing(10),
    backgroundColor: indigo[500]
  }
}));

function MailAvatars() {
  const classes = useMail();

  return (
    <div className={classes.root}>
      <Avatar variant="rounded" className={classes.rounded}>
        <ContactMailIcon style={{ fontSize: 50 }} />
      </Avatar>
    </div>
  );
}

function AccountAvatars() {
  const classes = useAccount();

  return (
    <div className={classes.root}>
      <Avatar variant="rounded" className={classes.rounded}>
        <SchoolIcon style={{ fontSize: 50 }} />
      </Avatar>
    </div>
  );
}

function TimeAvatars() {
  const classes = useTime();

  return (
    <div className={classes.root}>
      <Avatar variant="rounded" className={classes.rounded}>
        <AccessTimeIcon style={{ fontSize: 50 }} />
      </Avatar>
    </div>
  );
}

const SimpleCard = ({ icon, type, num, index }) => {
  const classes = useStyles();

  return (
    <Card
      className={
        index === 1
          ? classes.rootp
          : index === 2
          ? classes.rootd
          : classes.rooti
      }
    >
      {icon}
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {type}
        </Typography>
        <Typography variant="h5" component="h2">
          {num}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default function Home() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  /* const [data, setData] = useState([]); */
  const classes = useStyle();

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

  /* useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://kgziu.sse.codesandbox.io/posts/count"
      );

      await setData(result.data);
    };

    fetchData();
  }, []); */

  return (
    <div className={classes.root}>
      {/* <Grow in>
        <Container>
          <Grid container justify="center" alignItems="stretch">
            <Grid item xs={4}>
              <SimpleCard
                icon={<AccountAvatars />}
                type="Total User"
                num={data.account}
                index={1}
              />
            </Grid>
            <Grid item xs={4}>
              <SimpleCard
                icon={<MailAvatars />}
                type="Total Claim"
                num={data.message}
                index={2}
              />
            </Grid>
            <Grid item xs={4}>
              <SimpleCard
                icon={<TimeAvatars />}
                type="Last Claim"
                num={moment(data.date).fromNow()}
                index={3}
              />
            </Grid>
          </Grid>
        </Container>
      </Grow> */}
      <div className="bio_card">
        <div className="left">
          <div className="btn">
            <i className="fas fa-plus"></i>
          </div>
          <img className="cover" src={teacher} alt="alt" />
          <div className="box">
            <img className="profile" src={avatar} alt="alt" />
          </div>
          <h1>Profil #name</h1>
          <div className="info">
            <div className="col">
              <a
                href="/"
                className="social"
                style={{ textDecoration: "none", color: "#6c63ff" }}
              >
                <i className="fab fa-twitter kk"></i>
              </a>
              <h3>120.1K</h3>
            </div>

            <div className="col">
              <a
                href="/"
                className="social"
                style={{ textDecoration: "none", color: "#6c63ff" }}
              >
                <i className="fab fa-facebook"></i>
              </a>
              <h3>54K</h3>
            </div>

            <div className="col">
              <a
                href="/"
                className="social"
                style={{ textDecoration: "none", color: "#6c63ff" }}
              >
                <i className="fas fa-heart"></i>
              </a>
              <h3>12K</h3>
            </div>
          </div>
        </div>
        <div className="right" style={{ width: "500px" }}>
          <div className="text">
            <h1>User profil</h1>
            <h2>
              <center>Full name : {user.result.name}</center>
            </h2>
            <h3>
              <b>CIN :</b>
            </h3>
            <p style={{ color: "black" }}>{user.result.CIN}</p>
            {!user.result.isAdmin &&
            !user.result.isProf &&
            !user.result.isResp &&
            !user.result.isAll ? (
              <>
                <h3>
                  <b>CNE :</b>
                </h3>
                <p style={{ color: "black" }}>{user.result.CNE}</p>
                <h3>
                  <b>Apo :</b>
                </h3>
                <p style={{ color: "black" }}>{user.result.Apo}</p>
                <h3>
                  <b>Claims :</b>
                </h3>
                <p style={{ color: "black" }}>{posts.length}</p>
              </>
            ) : (
              <>
                <h3>
                  <b>Claims :</b>
                </h3>
                <p style={{ color: "black" }}>{posts.length}</p>
              </>
            )}
            <Link to="/pass" className="button text-center">
              <i className="far fa-envelope"></i>
              Edit profil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
