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
            dogWalkService:false,
            dogSitService:false,
            dogBoardService:false,
            editing:false
        }
    }

    toggle = (prop) => {
        this.setState({        
            [prop]: !this.state[prop]            
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
                    <input placeholder={'Name'} onChange={e=>{this.handleInput('providerName', e.target.value)}} />
                    <input placeholder={'Short Description'} onChange={e=>{this.handleInput('providerShortDescription', e.target.value)}} />
                    <input placeholder={'Experience'} onChange={e=>{this.handleInput('providerExperience', e.target.value)}} />
                    <input placeholder={'Bio'} onChange={e=>{this.handleInput('providerBio', e.target.value)}} />
                    <input placeholder={'Picture'} onChange={e=>{this.handleInput('providerPicture', e.target.value)}} />
                    <input placeholder={'Zip Code'} onChange={e=>{this.handleInput('providerZip', e.target.value)}} />
                    
                    <div> 
                        <input type='checkbox' onChange={()=>{this.toggle('dogWalkService')}}/> Dog Walking
                    </div>
                    <div> 
                        <input type='checkbox' onChange={()=>{this.toggle('dogSitService')}}/> Dog Sitting
                    </div>
                    <div> 
                        <input type='checkbox' onChange={()=>{this.toggle('dogBoardService')}}/> Dog Boarding
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
                        <input type='checkbox' checked=''/> Dog Walking
                    </div>
                    <div> 
                        <input type='checkbox' checked={dogSitService ? "checked" : ""}/> Dog Sitting
                    </div>
                    <div> 
                        <input type='checkbox' checked={ dogBoardService ? "checked" : "unchecked"}/> Dog Boarding
                    </div>
                </div>}



                <div>
                    {!editing && save}
                    <button onClick={()=> this.toggle('editing')}> {editing ? 'Update' : 'Edit Profile'} </button>
                </div>

            </>
        )
    }
}

export default ProviderProfile;