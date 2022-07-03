import Claim from "../components/Test/Claim.js";
import Form from "../components/Form/Form.js";
import Home from "../components/Test/Home.js";
import Pass from "../components/Pass/Pass.js";
import Enable from "../components/Enable/Enable.js";
import Dashboard from "../components/Test/Dashboard.js";
import Setting from "../components/Account/Setting.js";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as actionType from "../constants/actionTypes";
import { getPosts } from "../actions/post";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PostDetails from "../components/Posts/PostDetails/PostDetails.js";
import Start from "../components/Test/Start.js";
import AdminAuth from "../components/Auth/AdminAuth.js";
import "./profil.css";
import "./style.css";

const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [currentId, setCurrentId] = useState(0);
  const dispatch = useDispatch();
  user
    ? document.body.classList.add("slide3")
    : document.body.classList.add("slide2");

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    setUser(null);
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <Router>
      <div className="wrapper">
        {user ? (
          <div className="top_navbar">
            <div className="logo">
              <Link to="/">LOGO</Link>
            </div>
            <div className="top_menu">
              <div class="home_link"></div>
              <div class="right_info">
                <div class="icon_wrap" onClick={logout}>
                  <div class="icon">
                    <i class="fas fa-bell" aria-hidden="true"></i>
                  </div>
                </div>
                <div class="icon_wrap" onClick={logout}>
                  <div class="icon">
                    <i class="fas fa-cog" aria-hidden="true"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="main_body">
          {user && (
            <div className="sidebar_menu">
              <div className="inner__sidebar_menu">
                <ul>
                  <li>
                    <Link to="/">
                      <span className="icon">
                        <i className="fas fa-envelope-open-text"></i>
                      </span>
                      <span className="list">Profil</span>
                    </Link>
                  </li>
                  {!user.result.isAdmin &&
                    !user.result.isProf &&
                    !user.result.isResp &&
                    !user.result.isAll && (
                      <li>
                        <Link to="/create">
                          <span className="icon">
                            <i className="fas fa-book-reader"></i>
                          </span>
                          <span className="list">Create a Complaint</span>
                        </Link>
                      </li>
                    )}
                  {!user.result.isAll && (
                    <li>
                      <Link to="/dashboard">
                        <span className="icon">
                          <i className="fas fa-folder-plus"></i>
                        </span>
                        <span className="list">All claims</span>
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link to="/pass">
                      <span className="icon">
                        <i className="fas fa-border-all"></i>
                      </span>
                      <span className="list">User Settings</span>
                    </Link>
                  </li>
                  {user.result.isAll && (
                    <li>
                      <Link to="/auth/admin">
                        <span className="icon">
                          <i className="far fa-comments"></i>
                        </span>
                        <span className="list">Create Account</span>
                      </Link>
                    </li>
                  )}
                  {user.result.isAll && (
                    <li>
                      <Link to="/acc">
                        <span className="icon">
                          <i className="fas fa-address-card"></i>
                        </span>
                        <span className="list">All User Settings</span>
                      </Link>
                    </li>
                  )}
                </ul>
                <div className="hamburger">
                  <div className="inner_hamburger">
                    <span className="arrow">
                      <i className="fas fa-long-arrow-alt-left"></i>
                      <i className="fas fa-long-arrow-alt-right"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <Switch>
            {user && (
              <div className="container">
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/create">
                  <Form setCurrentId={setCurrentId} />
                </Route>
                <Route exact path="/pass">
                  <Pass setCurrentId={setCurrentId} />
                </Route>
                <Route exact path="/dashboard">
                  <Claim />
                </Route>
                <Route exact path="/details/:id">
                  <PostDetails />
                </Route>
                {user.result.isAll && (
                  <Route exact path="/acc">
                    <Dashboard />
                  </Route>
                )}
                {user.result.isAll && (
                  <Route exact path="/setting/:index">
                    <Setting />
                  </Route>
                )}
                {user.result.isAll && (
                  <Route exact path="/auth/admin">
                    <AdminAuth />
                  </Route>
                )}
              </div>
            )}
            <Route exact path="/enable/:id">
              <Enable />
            </Route>
            <Route path="*">
              <Start />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
