import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from 'react-bootstrap/Table'

const Track = props => (
  <tr>
    <td><Link className="text-dark" to={`/tracks/${props.track._id}`}>{props.track.track_id}</Link></td>
    <td><Link className="font-weight-bold" to={`/tracks/${props.track._id}`}>{props.track.track_name}</Link></td>
    <td>{props.track.track_length}</td>
    <td>{props.track.artist}</td>
  </tr>
)

export default class TrackIndex extends Component {

  constructor(props) {
    super(props);

    this.state = {
      tracks: []
    };
  }

  componentDidMount() {
    axios.get((process.env.REACT_APP_BACKEND || 'http://localhost:4000') + "tracks/")
      .then(response => {
        console.log(response);
        this.setState({
          tracks: response.data
        })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  trackList() {
    return this.state.tracks.map(currentTrack => {
      return <Track track={currentTrack} key={currentTrack._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3 className="text-light">Track List</h3>
        <Table className="card1 mb-4 shadow-sm">
          <thead>
            <tr>
              <th>Track ID</th>
              <th className="fas fa-music">Track Name</th>
              <th>Track Length</th>
              <th className="fas fa-headphones">Artist</th>
            </tr>
          </thead>
          <tbody className="text-dark font-weight-light card-text">
            {this.trackList()}
          </tbody>
        </Table>

      </div>
    );
  }
}
