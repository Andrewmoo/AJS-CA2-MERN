import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import TrackIndex from './views/tracks/Index'

import TrackCreate from './views/tracks/Create'

import TrackEdit from './views/tracks/Edit'

import TrackShow from './views/tracks/Show'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import MyNavbar from './components/MyNavbar'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Thumbnail } from 'react-bootstrap';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem('jwtToken') !== null,
      userEmail: localStorage.getItem('userEmail')
    }
  };

  authHandler = () => {
    this.setState((state, props) => ({
      loggedIn: state.loggedIn ? false : true
    }));
  };

  render() {
    const { loggedIn, userEmail } = this.state;
    return (
      <BrowserRouter>
        <MyNavbar loggedIn={loggedIn} userEmail={userEmail} onLogout={this.authHandler} />
        <Container>
          <Row>
            <Col>
              <Switch>
                <Route path="/" exact component={TrackIndex} />
                {/* <Route exact path="/movies/create">{loggedIn ? (props) => <MovieCreate {...props} loggedIn={loggedIn} /> : <Redirect to="/" />}</Route> */}
                <Route exact path="/tracks/create">{loggedIn ? (props) => <TrackCreate {...props} loggedIn={loggedIn} /> : <Redirect to="/" />}</Route>
                {/* <Route exact path="/movies/:id">{(props) => <MovieShow {...props} loggedIn={loggedIn} />}</Route> */}
                <Route exact path="/tracks/:id">{(props) => <TrackShow {...props} loggedIn={loggedIn} />}</Route>
                {/* <Route exact path="/movies/:id/edit">{loggedIn ? (props) => <MovieEdit {...props} loggedIn={loggedIn} /> : <Redirect to="/" />}</Route> */}
                <Route exact path="/tracks/:id/edit">{loggedIn ? (props) => <TrackEdit {...props} loggedIn={loggedIn} /> : <Redirect to="/" />}</Route>
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />
              </Switch>
            </Col>
          </Row>
        </Container>
      </BrowserRouter>
    );
  }
}

export default App;
