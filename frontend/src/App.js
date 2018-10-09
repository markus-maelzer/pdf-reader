import React, { Component } from 'react';
import ReactDropzone from 'react-dropzone';
import axios from 'axios';

import SlateEditor from './components/editor';
import Stars from './components/stars';

class App extends Component {
  state = {
    uploadProgress: 0,
    accepted: [],
    rejected: [],
    text: null,
    loading: false,
  }

  onDrop = (accepted, rejected) => {
    console.log(accepted);
    this.setState({
      accepted,
      rejected
    });
  }

  handleSubmit = () => {
    // POST to a test endpoint for demo purposes
    const { accepted: files } = this.state;
    if(files.length === 0) return;
    this.setState({loading: true,})
    files.forEach(file => {
      var config = {
        onUploadProgress: (progressEvent) => {
          var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
          this.setState({uploadProgress: percentCompleted})
        }
      };

      var formData = new FormData();
      formData.append('pdf', file)
      axios.post('/parse-pdf', formData, config).then((res) => {
        console.log(res.data);
        this.setState({
          text: res.data,
          loading: false
        })

      });

    });
  }

  renderEditor = () => {
    if(this.state.text) {
      return <SlateEditor text={this.state.text} />;
    }
  }

  render() {
    const { loading } = this.state;
    return (
      <div className={`container ${loading ? 'bg-grey' : ''}`}>
        <div className={`app ${loading ? 'bg-unicorn' : ''}`}>
          <div className="loader">
            {this.state.uploadProgress}
          </div>
          <div className="dropzone">
            <ReactDropzone
              multiple={false}
              onDrop={this.onDrop}
              accept="application/pdf"
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
          {this.renderEditor()}
        </div>
        <Stars />
      </div>
    );
  }
}

export default App;
