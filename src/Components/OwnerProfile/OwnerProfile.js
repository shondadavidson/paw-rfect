import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { updateUser } from './../../ducks/reducer';
import { Link } from 'react-router-dom';
import Dogs from '../Dogs/Dogs';
import { updateOwnersDogs } from '../../ducks/reducer';
import axios from 'axios';
import ImageUpload from '../ImageUpload/ImageUpload'
import MapContainer from '../Map/MapContainer'

class OwnerProfile extends Component {
    constructor() {
        super()

        this.state = {
            file: '',
            filename: '',
            filetype: '',
            editing: false,
            ownerName: '',
            ownerShortDescription: '',
            ownerPicture: '',
            ownerZip: 0,
            edited: false

        }
    }

    componentDidMount() {
        this.getIdProp()
        this.getOwner()
        this.getDogs()
    }

    getIdProp = () => {
        this.setState({
            ownerName: this.props.name
        })
    }

    toggle = (prop) => {
        this.setState({
            [prop]: !this.state[prop]
        })
    }

    handleInput = (prop, val) => {
        this.setState({
            [prop]: val,
            edited: true
        })
    }

    setOwner = (val) => {
        this.setState({
            ownerName: val.name,
            ownerShortDescription: val.owner_desc,
            ownerPicture: val.picture,
            ownerZip: val.zip
        })
    }

    save = async () => {
        const { id } = this.props
        const { ownerName, ownerShortDescription, ownerPicture, ownerZip } = this.state
        // console.log({ownerId: id}, ownerName, ownerShortDescription, ownerPicture, ownerZip);
        let infoUpdate = { ownerName, ownerShortDescription, ownerPicture, ownerZip };
        let res = await axios.put(`/api/updateOwner/${id}`, infoUpdate);
        this.setOwner(res.data[0])
        this.setState({
            edited: false
        })
    }

    getDogs = async () => {
        const { id, updateOwnersDogs } = this.props
        // console.log(id)
        let res = await axios.get(`/api/getDogs/${id}`)
        // console.log({data:res.data})
        updateOwnersDogs(res.data)
    }

    deleteDog = async (dogId, ownerId) => {
        // console.log({dogId:dogId},{ownerId:ownerId})
        // console.log('hit dog delete button', dogId, ownerId)
        let res = await axios.delete(`/api/deleteDog/${dogId}`, {data: {ownerId}})  //giving it the data object with an object inside creates the body prop on the req in the controller.
        // console.log({resData:res.data})
        this.props.updateOwnersDogs(res.data)
    }

    getOwner = async () => {
        const { id } = this.props
        // console.log(id)
        let res = await axios.get(`/api/getOwner/${id}`)
        // console.log({data:res.data})
        this.setOwner(res.data[0])
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
                ownerPicture: '',
            });
        };
        // take the file from the input field and process it at a DataURL (a special way to interpret files)
        reader.readAsDataURL(file);
    }

    // when clicked it upload
    sendPhoto = event => {
        return axios.post('/api/uploadOwner', this.state).then(response => {
            console.log(response.data)
            this.setState({ ownerPicture: response.data.Location });

        });
    }

    render() {
        const save = <button onClick={e => { this.save() }}>Save</button>
        // console.log(this)
        // console.log({testImageProvidedByRobohashDotOrg:'https://robohash.org/borris?set=set4'})
        // console.log({ edited: this.state.edited })
        return (

            <div className='OwnerProfile'>


                <div>
                    <div style={{display:'none'}}>
                    <MapContainer style={{height: 10}}
                        zip ={this.state.ownerZip}
                    /> 
                    </div>
                    Welcome {this.state.ownerName}
                </div>
                {this.state.editing && <div style={{ 'display': 'flex', 'flexDirection': "column", 'alignItems': 'center' }}>

                    <div className='row OwnerProfileImage'>
                        <ImageUpload
                            state={this.state}
                            sendPhoto={this.sendPhoto}
                            handlePhoto={this.handlePhoto}
                        />

                    </div>
                    <div className='row'>
                        <span className='OwnerProfilePlaceholder'>Display Name: </span>
                        <input placeholder={'Name'} onChange={e => { this.handleInput('ownerName', e.target.value) }} />
                    </div>
                    <div className='row'>
                        <span className='OwnerProfilePlaceholder'>Description</span>
                        <input placeholder={'Short Description'} onChange={e => { this.handleInput('ownerShortDescription', e.target.value) }} />
                        {/* <input placeholder={'Picture'} onChange={e=>{this.handleInput('ownerPicture', e.target.value)}}/> */}
                    </div>
                    <div className='row'>
                        <span className='OwnerProfilePlaceholder'>Zip Code</span>
                        <input placeholder={'Zip Code'} onChange={e => { this.handleInput('ownerZip', e.target.value) }} />
                    </div>
                </div>}

                {!this.state.editing && <div >
                    <div className=''>
                        <div className=''>
                            <img className='OwnerProfileImage' src={this.state.ownerPicture} alt='profile picture' />
                        </div>
                    </div>
                    <div className='row'>
                        <span className='OwnerProfilePlaceholder'>Display Name: </span>
                        <input placeholder={'Name'} value={this.state.ownerName} readOnly />
                    </div>
                    <div className='row'>
                        <span className='OwnerProfilePlaceholder'>Description</span>
                        <input placeholder={'Short Description'} value={this.state.ownerShortDescription} readOnly />
                    </div>
                    <div className='row'>
                        <span className='OwnerProfilePlaceholder'>Zip Code</span>
                        <input placeholder={'Zip Code'} value={this.state.ownerZip} readOnly />
                    </div>
                </div>}




                {/* <div className='row'> */}
                {/* <div className='col-12'> */}


                {/* </div> */}
                {/* </div> */}



                <div>
                    {!this.state.editing &&
                        <Link to='/home'>
                            <button>Back</button>
                        </Link>
                    }
                    {this.state.editing && <button onClick={() => (this.toggle('editing'))}>Back</button>}
                    {!this.state.editing && this.state.edited && save}
                    <button onClick={() => this.toggle('editing')}> {this.state.editing ? 'Update' : 'Edit Profile'} </button>
                </div>
                

            <Dogs deleteDog={this.deleteDog}/>
                <div>
                    <Link to='/adddog'>
                        <button>+ Add Dog</button>
                    </Link>
                </div>
            </div >

        )
    }
}

const mapStateToProps = reduxState => {
    return {
        name: reduxState.name,
        id: reduxState.id,
        ownersDogs: reduxState.ownersDogs
    }
}

const mapDispatchToProps = {
    updateOwnersDogs
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerProfile);