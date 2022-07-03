import React, { useState } from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";

const link = ["/", "/create", "/dashboard", "/pass", "/auth/admin", "/acc"];

const useStyles = makeStyles((theme) => ({
  list: {
    width: 300,
    height: "100%",
    color: "black",
    backgroundColor: "white"
  },
  fullList: {
    width: "auto"
  },
  menuButton: {
    color: "white"
  },
  menuButtons: {
    color: "black",
    padding: "25px 0"
  },
  toolbar: theme.mixins.toolbar
}));

export default function SwipeableTemporaryDrawer() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const history = useHistory();
  const routes = (index) => {
    history.push(link[index]);
  };

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom"
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        <ListItem onClick={() => routes(0)} button>
          <ListItemIcon className={classes.menuButtons}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {!user.result.isAdmin &&
          !user.result.isProf &&
          !user.result.isResp &&
          !user.result.isAll && (
            <ListItem onClick={() => routes(1)} button>
              <ListItemIcon className={classes.menuButtons}>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Create a Complaint" />
            </ListItem>
          )}
        {!user.result.isAll && (
          <ListItem onClick={() => routes(2)} button>
            <ListItemIcon className={classes.menuButtons}>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary="All The Complaints" />
          </ListItem>
        )}
        <ListItem onClick={() => routes(3)} button>
          <ListItemIcon className={classes.menuButtons}>
            <ContactMailIcon />
          </ListItemIcon>
          <ListItemText primary="Your Account Settings" />
        </ListItem>
        {user.result.isAll && (
          <ListItem onClick={() => routes(4)} button>
            <ListItemIcon className={classes.menuButtons}>
              <AssignmentIndIcon />
            </ListItemIcon>
            <ListItemText primary="Create an Account" />
          </ListItem>
        )}
        {user.result.isAll && (
          <ListItem onClick={() => routes(5)} button>
            <ListItemIcon className={classes.menuButtons}>
              <SupervisedUserCircleIcon />
            </ListItemIcon>
            <ListItemText primary="All Account Settings" />
          </ListItem>
        )}
      </List>
      <Divider />
    </div>
  );

  return (
    <div>
      {user ? (
        [""].map((anchor) => (
          <React.Fragment key={anchor}>
            <Button
              className={classes.menuButton}
              onClick={toggleDrawer(anchor, true)}
            >
              <MenuIcon />
            </Button>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
