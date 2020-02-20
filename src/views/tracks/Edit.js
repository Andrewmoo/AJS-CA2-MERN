/**
 * @Date:   2020-01-22T06:50:52+00:00
 * @Last modified time: 2020-02-03T11:11:31+00:00
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



export default class TrackEdit extends Component {
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

  componentDidMount() {
    const { id } = this.props.match.params;


    axios.get((process.env.REACT_APP_BACKEND || 'http://localhost:4000') + `/tracks/${id}`)
      .then(response => {
        console.log(response);
        var genre = response.data.genre.map(genre => {
          return genre.name;
        });
        this.setState({
          track_id: response.data.track_id,
          track_name: response.data.track_name,
          track_length: response.data.track_length,
          artist: response.data.artist,
          explicit: response.data.explicit,
          genre: genre,
          loading: true
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onAddGenre = () => {
    this.setState(state => {
      const genre = [...state.genre, state.genreText];
      return {
        genre,
        genreText: '',
      };
    });
  };

  onDelete = () => {
    const { id } = this.props.match.params;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.delete((process.env.REACT_APP_BACKEND || 'http://localhost:4000') + `/tracks/${id}`)
      .then((res) => {
        console.log('Student successfully deleted!')
      }).catch((error) => {
        console.log(error)
      })
  }

  onSubmit = e => {
    const { id } = this.props.match.params;
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

    console.log(track);

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken')
    axios.put((process.env.REACT_APP_BACKEND || 'http://localhost:4000') + `/tracks/${id}`, track)
      .then(res => {
        console.log(res.data);
        this.props.history.push("/");
      })
      .catch(err => {
        console.log(err)
        console.log("gamere");
        // this.props.history.push("/login");
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
        <h3>Edit Track</h3>
        <Form onSubmit={this.onSubmit}>
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
                  <Button onClick={this.onAddGenre} variant="outline-success">Add Genre</Button>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Form.Group>

          <Row>
            <Col sm={{ span: 10, offset: 2 }}>
              <>
                {this.genreList()}
              </>
            </Col>
          </Row>
          <br />

          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button type="submit">Save Changes</Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    )
  }

}
