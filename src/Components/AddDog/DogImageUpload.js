import React, { Component } from 'react';

class ImageUpload extends Component {

  render() {
    return (
      <div className="ImageUpload" style={{display:'flex'}}>
        <input type="file" id="real" onChange={this.props.handlePhoto}/>
        <button onClick={this.props.sendPhoto}>upload</button>
        <div >
          <img src={this.props.state.dogPicture} alt="none" />
        </div>
        
      </div>
    );
  }
}

export default ImageUpload;