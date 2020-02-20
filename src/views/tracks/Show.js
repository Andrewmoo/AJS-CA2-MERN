/**
 * @Date:   2020-01-22T06:50:52+00:00
 * @Last modified time: 2020-01-27T15:48:34+00:00
 */
import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Genre = props => (
  <Badge variant="Light">{props.genre}</Badge>
)

export default class TrackShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      track: {},
      loading: true
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get(`http://localhost:4000/tracks/${id}`)
      .then(response => {
        console.log(response);
        this.setState({
          track: response.data,
          loading: false
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }


  genreList() {
    return this.state.track.genre.map((currentGenre, index) => {
      return <Genre genre={currentGenre.name} key={index} />;
    })
  }

  onDelete = () => {
    const { id } = this.props.match.params;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.delete(REACT_APP_BACKEND || `http://localhost:4000/tracks/${id}`)
      .then((res) => {
        console.log('Student successfully deleted!')
        window.location = '/';
      }).catch((error) => {
        console.log(error)
      })
  }

  render() {
    const { id } = this.props.match.params;
    const { track, loading } = this.state;
    const loggedIn = this.props.loggedIn;
    // console.log(loggedIn);
    console.log("explicit: ", track.explicit)
    if (loading) {
      return (
        <div>
          <h3>Loading...</h3>
        </div>
      )
    } else {
      return (
        <div>
          <div className="card1 mb-4 shadow-sm">
                <div className="card-body">
                    <h3>{track.track_name} | {track.artist}</h3>
                    <p className="card-text">
                        <strong><i className="fas fa-music"></i> Track Length</strong>: {track.track_length}
                        <br/>
                        <strong><i className="fas fa-music"></i> Explicit</strong>: {track.explicit ? 'true' : 'false'}
                        <br/>
                        <strong><i className="fas fa-music card-text"></i> Genre</strong>: {this.genreList()}
                    </p>
                    <Button as={Link} to="/" variant="primary">View all songs</Button>
              {loggedIn ?
                <>
                  <Button className="ml-1" as={Link} to={`/tracks/${id}/edit`} variant="primary">Edit</Button>
                  <Button className="ml-1" onClick={this.onDelete} variant="danger">Delete</Button>
                </>
                :
                <>
                </>
              }
                </div>
            </div>

        </div>
      )

    }
  }
}
