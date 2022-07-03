import { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Container, Grow } from "@material-ui/core";
import CardItem from "./Card/Card.js";
import useStyles from "../Home/styles";

function Account() {
  const [data, setData] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://kgziu.sse.codesandbox.io/posts/all");

      await setData(result.data);
    };

    fetchData();
  }, []);

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
              {data.map((item, index) => (
                <Grid key={index} item xs={12} sm={6} md={6}>
                  <CardItem
                    title={item.email}
                    name={item.name}
                    CIN={item.CIN}
                    CNE={item.CNE}
                    Apo={item.Apo}
                    link={"/setting/" + index}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Account;
