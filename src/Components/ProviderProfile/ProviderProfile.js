import React, {Component} from 'react';

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
            editing:false
        }
    }

    toggleEditing = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    toggle = (prop) => {
        let newVal = ""
        if(this.state[prop] === ""){
            newVal = "checked"
        }
        this.setState({        
            [prop]: newVal            
        })
    }

    handleInput = (prop, val) => {
        this.setState({
            [prop]:val
        })
    }

    save = () => {

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
            editing
        } = this.state
        console.log( 
            providerName, 
            providerShortDescription, 
            providerExperience,
            providerBio,
            providerPicture,
            providerZip,
            dogWalkService,
            dogSitService,
            dogBoardService,
            editing)
        const save = <button onClick={e=> {this.save()}}>Save</button>
        return(
            <>
                <h3>ProviderProfile Component</h3>
                <h3>Welcome Provider</h3>


                {editing && <div style={{'display':'flex', 'flexDirection':"column", 'alignItems':'center'}}>
                    <input placeholder={providerName ? providerName : 'Name'} onChange={e=>{this.handleInput('providerName', e.target.value)}} />
                    <input placeholder={providerShortDescription ? providerShortDescription :'Short Description'} onChange={e=>{this.handleInput('providerShortDescription', e.target.value)}} />
                    <input placeholder={providerExperience ? providerExperience : 'Experience'} onChange={e=>{this.handleInput('providerExperience', e.target.value)}} />
                    <input placeholder={providerBio ? providerBio : 'Bio'} onChange={e=>{this.handleInput('providerBio', e.target.value)}} />
                    <input placeholder={providerPicture ? providerPicture : 'Picture'} onChange={e=>{this.handleInput('providerPicture', e.target.value)}} />
                    <input placeholder={providerZip ? providerZip : 'Zip Code'} onChange={e=>{this.handleInput('providerZip', e.target.value)}} />
                    
                    <div> 
                        <input type='checkbox' checked={ dogWalkService } onChange={()=>{this.toggle('dogWalkService')}}/> Dog Walking
                    </div>
                    <div> 
                        <input type='checkbox' checked={ dogSitService } onChange={()=>{this.toggle('dogSitService')}}/> Dog Sitting
                    </div>
                    <div> 
                        <input type='checkbox' checked={ dogBoardService } onChange={()=>{this.toggle('dogBoardService')}}/> Dog Boarding
                    </div>
                </div>}

                {!editing && <div style={{'display':'flex', 'flexDirection':"column", 'alignItems':'center'}}>
                    <input placeholder={'Name'} value={providerName} readOnly/>
                    <input placeholder={'Short Description'} value={providerShortDescription} readOnly/>
                    <input placeholder={'Experience'} value={providerExperience} readOnly/>
                    <input placeholder={'Bio'} value={providerBio} readOnly/>
                    <img src={providerPicture} alt=''/>
                    <input placeholder={'Zip Code'} value={providerZip} readOnly/>
                    
                    <div> 
                        <input type='checkbox' checked={ dogWalkService }/> Dog Walking
                    </div>
                    <div> 
                        <input type='checkbox' checked={ dogSitService }/> Dog Sitting
                    </div>
                    <div> 
                        <input type='checkbox' checked={ dogBoardService }/> Dog Boarding
                    </div>
                </div>}



                <div>
                    {!editing && save}
                    <button onClick={()=> this.toggleEditing()}> {editing ? 'Update' : 'Edit Profile'} </button>
                </div>

            </>
        )
    }
}

export default ProviderProfile;