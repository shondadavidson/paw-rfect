import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
// import { updateOwnersDogs } from '../../ducks/reducer';
import axios from 'axios';
import ImageUpload from '../ImageUpload/ImageUpload'

class ProviderProfile extends Component{
    constructor(){
        super()

        this.state={
            file: '',
            filename: '',
            filetype: '',
            providerName: '',
            providerShortDescription: '',
            providerExperience: '',
            providerBio:'',
            providerPicture:'',
            providerZip:0,
            dogWalkService:"",
            dogSitService:"",
            dogBoardService:"",
            editing:false,
            ownerPicture: '',
            edited:false
        }
    }

    componentDidMount(){
        this.getIdProp()
        this.getProviderProfile()
    }

    getIdProp = () => {
        this.setState({
            ownerName: this.props.name
        })
    }

    toggleEditing = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    toggle = (prop) => {
        let newVal = ""
        if(this.state[prop] === ""){
            newVal = "defaultChecked"
        }
        this.setState({        
            [prop]: newVal,
            edited: true           
        })
    }

    handleInput = (prop, val) => {
        this.setState({
            [prop]: val,
            edited: true
        })
    }

    save = async() => {
        const {id} = this.props
        const {providerName, providerShortDescription, providerExperience, providerBio, providerPicture, providerZip, dogWalkService, dogSitService, dogBoardService} = this.state
        // console.log({providerId: id}, providerName, providerShortDescription, providerExperience, providerBio, providerPicture, providerZip, dogWalkService, dogSitService, dogBoardService)
        let infoUpdate = {providerName, providerShortDescription, providerExperience, providerBio, providerPicture, providerZip, dogWalkService, dogSitService, dogBoardService}
        let res = await axios.put(`/api/updateProviderProfile/${id}`, infoUpdate);
        // console.log(res.data)
        this.setProviderProfile(res.data[0])
        this.setState({
            edited: false
        })
    }

    setProviderProfile = (val) => {
        this.setState({
            providerName: val.name,
            providerPicture: val.picture,
            providerShortDescription: val.short_desc,
            providerZip: val.zip,
            providerBio: val.bio,
            providerExperience: val.experience,
            dogWalkService: val.provider_walker,
            dogSitService: val.provider_sitter, 
            dogBoardService: val.provider_boarder
        })
    }

    getProviderProfile = async()=>{
        // console.log(this.props)
        const {id} = this.props
        // console.log(id)
        let res = await axios.get(`/api/getProviderProfile/${id}`)
        // console.log({resData:res.data[0]})
        this.setProviderProfile(res.data[0])
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
                providerPicture: '',
            });
        };
        // take the file from the input field and process it at a DataURL (a special way to interpret files)
        reader.readAsDataURL(file);
    }

    // when clicked it upload
    sendPhoto = event => {
        return axios.post('/api/uploadOwner', this.state).then(response => {
            this.setState({ providerPicture: response.data.Location });

        });
    }



    render(){ 
        console.log(2223333, this.state.providerPicture)            
        const{
            providerName, 
            providerShortDescription, 
            providerExperience,
            providerBio,
            providerPicture,
            providerZip,
            dogWalkService,
            dogSitService,
            dogBoardService,
            editing,
            edited
        } = this.state
        // console.log( 
        //     providerName, 
        //     providerShortDescription, 
        //     providerExperience,
        //     providerBio,
        //     providerPicture,
        //     providerZip,
        //     dogWalkService,
        //     dogSitService,
        //     dogBoardService,
        //     editing
        // )
        const save = <button onClick={e=> {this.save()}}>Save</button>
        return(
            <>
                <h3>
                    {providerName}'s Provider Profile
                </h3>


                {editing && <div className='profileView'>
                <div className=''>
                        <div className=''>

                    <img 
                        className='OwnerProfileImage'
                        src={providerPicture} 
                        alt='' 
                        
                    />
                    </div>
                    </div>
                    <div className='row ownerProfileDisplay'>
                        <span className='OwnerProfilePlaceholder'>Display Name: </span>
                    <input 
                        placeholder={providerName ? providerName : 'Name'} 
                        onChange={e=>{this.handleInput('providerName', e.target.value)}} 
                    />
                    </div>
                    <div className='row ownerProfileDisplay'>
                        <span className='OwnerProfilePlaceholder'>Short Description: </span>
                    <input 
                        placeholder={providerShortDescription ? providerShortDescription :'Short Description'} 
                        onChange={e=>{this.handleInput('providerShortDescription', e.target.value)}} 
                    />
                    </div>
                    <div className='row ownerProfileDisplay'>
                        <span className='OwnerProfilePlaceholder'>Experience: </span>
                    <input 
                        placeholder={providerExperience ? providerExperience : 'Experience'} 
                        onChange={e=>{this.handleInput('providerExperience', e.target.value)}} 
                    />
                    </div>
                    <div className='row ownerProfileDisplay'>
                        <span className='OwnerProfilePlaceholder'>Bio: </span>
                    <input 
                        placeholder={providerBio ? providerBio : 'Bio'} 
                        onChange={e=>{this.handleInput('providerBio', e.target.value)}} 
                    />
                    </div>
                
                  
                    <div className='row ownerProfileDisplay'>
                        <span className='OwnerProfilePlaceholder'>Display Name: </span>
                    <input 
                        placeholder={providerZip ? providerZip : 'Zip Code'} 
                        onChange={e=>{this.handleInput('providerZip', e.target.value)}} 
                    />
                    </div>
                    
                    <div> 
                        <input 
                            type='checkbox' checked={dogWalkService} 
                            onChange={()=>{this.toggle('dogWalkService')}}
                        /> Dog Walking
                    </div>
                    <div> 
                        <input 
                            type='checkbox' checked={dogSitService} 
                            onChange={()=>{this.toggle('dogSitService')}}
                        /> Dog Sitting
                    </div>
                    <div> 
                        <input 
                            type='checkbox' checked={dogBoardService} 
                            onChange={()=>{this.toggle('dogBoardService')}}
                        /> Dog Boarding
                    </div>
                </div>}

                {!editing && <div className='profileView'>
                <div className=''>
                        <div className=''>
                    <img 
                        className='OwnerProfileImage'
                        src={providerPicture} 
                        alt='' 
                        
                    />
                    </div>
                    </div>
                    <div className='row ownerProfileDisplay'>
                        <span className='OwnerProfilePlaceholder'>Display Name: </span>
                    <input 
                        placeholder={'Name'} 
                        value={providerName} 
                        readOnly
                    />
                    </div>
                    <div className='row ownerProfileDisplay'>
                        <span className='OwnerProfilePlaceholder'>Short Description: </span>
                    <input 
                        placeholder={'Short Description'} 
                        value={providerShortDescription} 
                        readOnly
                    />
                    </div>
                    <div className='row ownerProfileDisplay'>
                        <span className='OwnerProfilePlaceholder'>Experience: </span>
                    <input 
                        placeholder={'Experience'} 
                        value={providerExperience} 
                        readOnly
                    />
                    </div>
                    <div className='row ownerProfileDisplay'>
                        <span className='OwnerProfilePlaceholder'>Bio: </span>
                    <input 
                        placeholder={'Bio'} 
                        value={providerBio} 
                        readOnly
                    />
                    </div>
                    <div className='row ownerProfileDisplay'>
                        <span className='OwnerProfilePlaceholder'>Zip: </span>
                    <input 
                        placeholder={'Zip Code'} 
                        value={providerZip} 
                        readOnly
                    />
                    </div>
                 
                    <div className='services'>
                    <div className='row ownerProfileDisplayCheckbox'> 
                        <input 

                            type='checkbox' 
                            checked={dogWalkService} 
                            value={dogWalkService} 
                            disabled={editing ? false : true}
                        /> Dog Walking
                    </div>
                    <div className='row ownerProfileDisplay'> 
                        <input 
                            type='checkbox' 
                            checked={dogSitService} 
                            value={dogSitService} 
                            disabled={editing ? false : true}
                        /> Dog Sitting
                    </div>
                    <div className='row ownerProfileDisplay'> 
                        <input 
                            type='checkbox' 
                            checked={dogBoardService} 
                            value={dogBoardService} 
                            disabled={editing ? false : true}
                        /> Dog Boarding
                    </div>
                </div>
                </div>
                }
                <div>
                    {!editing && 
                            <Link to='/home'>
                                <button>Back</button>
                            </Link>
                    }
                    {editing && <button onClick={()=>(this.toggle('editing'))}>Back</button>}
                    {!editing && edited && save}
                    <button onClick={()=> this.toggleEditing()}> {editing ? 'Update' : 'Edit Profile'} </button>
                </div>

            </>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        name:reduxState.name,
        id: reduxState.id
    }
}

export default connect(mapStateToProps) (ProviderProfile);