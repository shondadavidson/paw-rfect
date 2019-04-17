import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
// import { updateOwnersDogs } from '../../ducks/reducer';
import axios from 'axios';

class ProviderProfile extends Component{
    constructor(){
        super()

        this.state={
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


    render(){             
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


                {editing && <div style={{'display':'flex', 'flexDirection':"column", 'alignItems':'center'}}>
                    <input 
                        placeholder={providerName ? providerName : 'Name'} 
                        onChange={e=>{this.handleInput('providerName', e.target.value)}} 
                    />
                    <input 
                        placeholder={providerShortDescription ? providerShortDescription :'Short Description'} 
                        onChange={e=>{this.handleInput('providerShortDescription', e.target.value)}} 
                    />
                    <input 
                        placeholder={providerExperience ? providerExperience : 'Experience'} 
                        onChange={e=>{this.handleInput('providerExperience', e.target.value)}} 
                    />
                    <input 
                        placeholder={providerBio ? providerBio : 'Bio'} 
                        onChange={e=>{this.handleInput('providerBio', e.target.value)}} 
                    />
                    <input 
                        placeholder={providerPicture ? providerPicture : 'Picture'} 
                        onChange={e=>{this.handleInput('providerPicture', e.target.value)}} 
                    />
                    <input 
                        placeholder={providerZip ? providerZip : 'Zip Code'} 
                        onChange={e=>{this.handleInput('providerZip', e.target.value)}} 
                    />
                    
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

                {!editing && <div style={{'display':'flex', 'flexDirection':"column", 'alignItems':'center'}}>
                    <img 
                        src={providerPicture} 
                        alt='' 
                        style={{'width':'50vw'}}
                    />
                    <input 
                        placeholder={'Name'} 
                        value={providerName} 
                        readOnly
                    />
                    <input 
                        placeholder={'Short Description'} 
                        value={providerShortDescription} 
                        readOnly
                    />
                    <input 
                        placeholder={'Experience'} 
                        value={providerExperience} 
                        readOnly
                    />
                    <input 
                        placeholder={'Bio'} 
                        value={providerBio} 
                        readOnly
                    />
                    <input 
                        placeholder={'Zip Code'} 
                        value={providerZip} 
                        readOnly
                    />
                    
                    <div> 
                        <input 
                            type='checkbox' 
                            checked={dogWalkService} 
                            value={dogWalkService} 
                            disabled={editing ? false : true}
                        /> Dog Walking
                    </div>
                    <div> 
                        <input 
                            type='checkbox' 
                            checked={dogSitService} 
                            value={dogSitService} 
                            disabled={editing ? false : true}
                        /> Dog Sitting
                    </div>
                    <div> 
                        <input 
                            type='checkbox' 
                            checked={dogBoardService} 
                            value={dogBoardService} 
                            disabled={editing ? false : true}
                        /> Dog Boarding
                    </div>
                </div>}



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