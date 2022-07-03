import { useParams } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePost } from "../../../actions/post";
import { useHistory } from "react-router-dom";
import {
  Grid,
  Typography,
  Grow,
  Paper,
  Container,
  TextField,
  Button
} from "@material-ui/core";
import FileBase from "react-file-base64";
import moment from "moment";
import useStyles from "./styles";

const PostDetails = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const posts = useSelector((state) => state.posts);
  const { id } = useParams();
  const post = posts.find((post) => post._id === id);
  const classes = useStyles();
  const [isPending, setIsPending] = useState(false);
  const [postData, setPostData] = useState({
    state: user?.result.state,
    priority: user?.result.priority,
    ResPAS: "",
    ResPAF: ""
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    await dispatch(updatePost(post._id, postData));
    history.push("/dashboard");
  };

  return (
    <Grow in>
      <Container>
        <Grid container justify="center" alignItems="stretch">
          <Grid item xs={12} sm={7}>
            {posts && (
              <Grid item lg={12} sm={7}>
                <Typography
                  variant="h3"
                  color="secondary"
                  className={classes.title}
                >
                  {post.DR} for {post.TDR}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.creator}
                >
                  Name : {post.creator}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.creator}
                >
                  CIN : {post.CIN}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.creator}
                >
                  CNE : {post.CNE}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.creator}
                >
                  Apo : {post.Apo}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.creator}
                >
                  Faculty : {post.Faculty}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.creator}
                >
                  Module : {post.module}
                </Typography>
                <Typography
                  variant="h6"
                  color="primary"
                  className={classes.creator}
                >
                  Semester : {post.tags}
                </Typography>
                <Typography variant="body2" className={classes.createdAt}>
                  {moment(post.createAt).fromNow()}
                </Typography>
                <Typography variant="body2" className={classes.content}>
                  {post.content}
                </Typography>
                {post.selectedFile && (
                  <Typography variant="body2" className={classes.content}>
                    <a href={post.selectedFile} download>
                      download
                    </a>
                  </Typography>
                )}
                {(post.ResPAS || post.ResPAF) && (
                  <Typography
                    variant="h6"
                    color="primary"
                    className={classes.creator}
                  >
                    Response
                  </Typography>
                )}
                {post.ResPAS && (
                  <Typography variant="body2" className={classes.content}>
                    {post.ResPAS}
                  </Typography>
                )}
                {post.ResPAF && (
                  <Typography variant="body2" className={classes.content}>
                    <a href={post.ResPAF} download>
                      download
                    </a>
                  </Typography>
                )}
                {(user.result.isAdmin || user.result.isProf) && (
                  <Paper className={classes.paper} elevation={3}>
                    <form
                      autoComplete="off"
                      className={`${classes.root} ${classes.form}`}
                      onSubmit={handleSubmit}
                    >
                      <TextField
                        name="message"
                        required
                        variant="outlined"
                        label="Describe problem or reason for Complaint"
                        fullWidth
                        multiline
                        color="primary"
                        rows={6}
                        value={postData.content}
                        onChange={(e) =>
                          setPostData({ ...postData, ResPAS: e.target.value })
                        }
                      />
                      <div className={classes.fileInput}>
                        <FileBase
                          type="file"
                          multiple={false}
                          onDone={({ base64 }) =>
                            setPostData({ ...postData, ResPAF: base64 })
                          }
                        />
                      </div>
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
                    </form>
                  </Paper>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default PostDetails;
