import { Grid, Grow, Container } from "@material-ui/core";
import CardItem from "./Card/Card.js";
import useStyles from "./styles";
import { useState } from "react";

const Home = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <Grow in>
      <Container>
        <Grid container justify="center" alignItems="stretch">
          <Grid item xs={12} sm={7}>
            <Grid
              className={classes.container}
              container
              alignItems="stretch"
              spacing={3}
            >
              {!user.result.isAdmin &&
                !user.result.isProf &&
                !user.result.isResp &&
                !user.result.isAll && (
                  <Grid key="1" item xs={12} sm={6} md={6}>
                    <CardItem title="Create a Complaint" link="/create" />
                  </Grid>
                )}

              {!user.result.isAll && (
                <Grid key="2" item xs={12} sm={6} md={6}>
                  <CardItem title="View The Complaints" link="/dashboard" />
                </Grid>
              )}

              <Grid key="3" item xs={12} sm={6} md={6}>
                <CardItem title="Your Account Settings" link="/pass" />
              </Grid>

              {user.result.isAll && (
                <Grid key="4" item xs={12} sm={6} md={6}>
                  <CardItem title="Create an Account" link="/auth/admin" />
                </Grid>
              )}

              {user.result.isAll && (
                <Grid key="5" item xs={12} sm={6} md={6}>
                  <CardItem title="All Account Settings" link="/acc" />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
