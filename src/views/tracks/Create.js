/**
 * @Date:   2020-01-22T06:50:52+00:00
 * @Last modified time: 2020-02-05T18:09:12+00:00
 */
import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Badge from 'react-bootstrap/Badge'

const Genre = props => (
  <Badge variant="light">{props.genre}</Badge>
)

export default class TrackCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      track_id: '',
      track_name: '',
      track_length: '',
      artist: '',
      explicit: '',
      genre: [],
      genreText: ''
    };
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(`Input name ${name}. Input value ${value}.`);

    this.setState({
      [name]: value
    });
  };



  onAddGenre = () => {
    this.setState(state => {
      const genre = [...state.genre, state.genreText];
      return {
        genre,
        genreText: '',
      };
    });
  };

  onSubmit = e => {
    e.preventDefault();

    let genreJSON = this.state.genre.map((name, index) => {
      return { name };
    })

    const track = {
      track_id: this.state.track_id,
      track_name: this.state.track_name,
      track_length: this.state.track_length,
      artist: this.state.artist,
      explicit: this.state.explicit,
      genre: genreJSON
    }

    const loggedIn = this.props.loggedIn;

    console.log(track);

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.post('/tracks', track)
      .then(res => {
        console.log(res.data);
        window.location = '/';
      })
      .catch(err => {
        console.log(err)
        if (!loggedIn) {

          window.location = '/login';

        } else {
          // window.location.reload();
          console.log(err)
        }
      });
  };

  genreList() {
    return this.state.genre.map((currentGenre, index) => {
      return <Genre genre={currentGenre} key={index} />
    })
  }

  render() {
    return (
      <div>
        <h3 className="text-light">Add New Song</h3>
        <Form className="text-light" onSubmit={this.onSubmit}>
        <Form.Group as={Row} controlId="formHorizontalTitle">
            <Form.Label column sm={2}>
              Track ID
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Track id"
                name="track_id"
                value={this.state.track_id}
                onChange={this.handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalIMDB">
            <Form.Label column sm={2}>
              Track Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Track name"
                name="track_name"
                value={this.state.track_name}
                onChange={this.handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalTitle">
            <Form.Label column sm={2}>
              Track Length
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Track Length"
                name="track_length"
                value={this.state.track_length}
                onChange={this.handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalTitle">
            <Form.Label column sm={2}>
              Artist
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Artist"
                name="artist"
                value={this.state.artist}
                onChange={this.handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalTitle">
            <Form.Label column sm={2}>
              Explicit
            </Form.Label>
            <Col sm={10}>
              <Form.Control type="text" placeholder="Explicit"
                name="explicit"
                value={this.state.explicit}
                onChange={this.handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formHorizontalGenre">
            <Form.Label column sm={2}>
              Genres
            </Form.Label>
            <Col sm={4}>
              <InputGroup>
                <Form.Control type="text" placeholder="Genre"
                  name="genreText"
                  value={this.state.genreText}
                  onChange={this.handleInputChange}
                />
                <InputGroup.Append>
                  <Button onClick={this.onAddGenre} variant="success">Add Genre</Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Form.Group>

          <Row>
            <Col sm={{ span: 10, offset: 2 }}>
              {this.genreList()}
            </Col>
          </Row>
          <br />

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Add Song</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    )
  }
}
