import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateOwnersDogs } from '../../ducks/reducer'
import DogImageUpload from './DogImageUpload'

class AddDog extends Component {
    constructor(){
        super()

        this.state={
            file: '',
            filename: '',
            filetype: '',
            dogName:'',
            dogAge:0,
            dogWeight:0,
            dogBreed:'',
            dogSpecialNotes:'',
            dogPicture:''
        }
    }

    handleInput = (prop, val) => {
        this.setState({
            [prop]:val
        })
    }

    save = async() => { 
        const { id, updateOwnersDogs } = this.props;
        let newDog ={
            dogName: this.state.dogName,
            dogAge: this.state.dogAge,
            dogWeight: this.state.dogWeight,
            dogBreed: this.state.dogBreed,
            dogGender: this.state.dogGender,
            dogSpecialNotes: this.state.dogSpecialNotes,
            dogPicture: this.state.dogPicture
        }
        let res = await axios.post(`/api/addDog/${id}`, newDog);
        updateOwnersDogs(res.data)
        this.props.history.push('/ownerprofile');
    }

    handlePhoto = event => {
        // this makes a generic file reader that an convert files into strings that allows us to upload it to a server.
        const reader = new FileReader();
        // the file itself is located here
        const file = event.target.files[0];
    
        // this is an event handeler and will not actaully run untill the code on line 39 finishes running
        reader.onload = photo => {
          // the photo param here is the processed image from the reader.
          this.setState({
            file: photo.target.result,
            filename: file.name,
            filetype: file.type,
            dogPicture: '',
          });
        };
        // take the file from the input field and process it at a DataURL (a special way to interpret files)
        reader.readAsDataURL(file);
      }
    
      // when clicked it upload
      sendPhoto = event => {
          const { file, filename, filetype, dogPicture } = this.state
          let s3file = {file, filename, filetype, dogPicture}
        return axios.post('/api/uploadDog', s3file).then(response => {
          this.setState({ dogPicture: response.data.Location });
          
        });
      }

    render(){ 
        return(
            <>
                <h1>Add A Dog</h1>
                
                <div style={{'display':'flex', 'flexDirection':"column", 'alignItems':'center'}}>
                    <input type='text' placeholder={'Name'} onChange={e=>{this.handleInput('dogName', e.target.value)}}/>
                    <input type='integer' placeholder={'Age'} onChange={e=>{this.handleInput('dogAge', e.target.value)}}/>
                    <input type='integer' placeholder={'Weight'} onChange={e=>{this.handleInput('dogWeight', e.target.value)}}/>
                    <input type='text' placeholder={'Breed'} onChange={e=>{this.handleInput('dogBreed', e.target.value)}}/>
                    <input type='text' placeholder={'Gender'} onChange={e=>{this.handleInput('dogGender', e.target.value)}}/>
                    <input type='text' placeholder={'Special Notes'} onChange={e=>{this.handleInput('dogSpecialNotes', e.target.value)}}/>
                    {/* <input type='text' placeholder={'Picture'} onChange={e=>{this.handleInput('dogPicture', e.target.value)}} /> */}
                    <DogImageUpload 
                        state={this.state}
                        sendPhoto={this.sendPhoto}
                        handlePhoto={this.handlePhoto}
                    />
                </div>

                <div>
                    <Link to='/ownerprofile'>
                        <button>←</button>
                    </Link>
                    <Link to='/ownerprofile'>
                    <button onClick={()=>{this.save(this.props)}}> | Save</button>
                    </Link>
                </div>
                
                    
            </>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        id: reduxState.id,
        ownersDogs: reduxState.ownersDogs
    }
}

const mapDispatchToProps = {
    updateOwnersDogs
}
export default connect(mapStateToProps, mapDispatchToProps) (AddDog);