import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import axios from 'axios';

class App extends Component {
  state = {
    uploadProgress: 0,
    accepted: [],
    rejected: []
  }

  onDrop = (accepted, rejected) => {
    this.setState({
      accepted: [...this.state.accepted, ...accepted],
      rejected:[...this.state.rejected, ...rejected]
    });
  }

  handleSubmit = () => {
    // POST to a test endpoint for demo purposes
    const { accepted: files } = this.state;
    if(files.length === 0) return;
    const data = new FormData();
    var config = {
      onUploadProgress: (progressEvent) => {
        var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
        this.setState({uploadProgress: percentCompleted})
      }
    };

    files.forEach(file => {
      data.append('pdf', file);
    });

    axios.post('/parse-pdf', data, config).then((res) => {
      console.log(res.data);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="loader">
          {this.state.uploadProgress}
        </div>
        <div className="dropzone">
          <ReactDropzone
            onDrop={this.onDrop}
          >
            drop your file here
          </ReactDropzone>
        </div>
        <aside>
          <h2>Accepted files</h2>
          <ul>
            {
              this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
          <h2>Rejected files</h2>
          <ul>
            {
              this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
        <button onClick={this.handleSubmit}>Send</button>
      </div>
    );
  }
}

export default App;
