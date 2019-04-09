import React, {Component} from 'react';

class OwnerProfile extends Component{
    constructor(){
        super()

        this.state={
            editing:false,
            ownerName:'Test Owner',
            ownerShortDescription:'Test Owner loves dogs',
            ownerPicture:'https://robohash.org/borris?set=set4',
            ownerZip:0

        }
    }

    toggle = (prop) => {
        console.log(this.state[prop])
        this.setState({        
            [prop]: !this.state[prop]            
        })
        console.log(this.state[prop])    
    }

    handleInput = (prop, val) => {
        this.setState({
            [prop]:val
        })
    }

    save = () => {

    }

    render(){
        return(
            <>
                <div>
                    Welcome {this.state.ownerName}
                </div>
                {this.state.editing && <div style={{'display':'flex', 'flexDirection':"column", 'alignItems':'center'}}>
                    <input placeholder={'Name'} onChange={e=>{this.handleInput('ownerName', e.target.value)}}/>
                    <input placeholder={'Short Description'} onChange={e=>{this.handleInput('ownerShortDescription', e.target.value)}}/>
                    <input placeholder={'Picture'} onChange={e=>{this.handleInput('ownerPicture', e.target.value)}}/>
                    <input placeholder={'Zip Code'} onChange={e=>{this.handleInput('ownerZip', e.target.value)}}/>
                </div>}

                {!this.state.editing && <div style={{'display':'flex', 'flexDirection':"column", 'alignItems':'center'}}>
                    <input placeholder={'Name'} value={this.state.ownerName} readOnly/>
                    <input placeholder={'Short Description'} value={this.state.ownerShortDescription} readOnly/>
                    <img src={this.state.ownerPicture} />
                    <input placeholder={'Zip Code'} value={this.state.ownerZip} readOnly/>
                </div>}




                <div>
                    <div>DOG</div>
                </div>
                <div>
                    <button onClick={()=>{this.props.history.push('/adddog')}}>+ Add Dog</button>
                </div>
                <div>
                    <button onClick={()=>(this.props.history.push('/home'))}>Back</button>
                    <button onClick={()=> this.toggle('editing')}> {this.state.editing ? 'Save' : 'Edit Profile'} </button>
                </div>
                {/* <div> 
                    This div and it's children to be deleted for production
                    <div>{this.state.editing  ? 'true' : 'false'}</div>
                    <div>{this.state.ownerName}</div>
                    <div>{this.state.ownerShortDescription}</div>
                    <div>{this.state.ownerPicture}</div>
                    <div>{this.state.ownerZip}</div>
                </div> */}
            </>
        )
    }
}

export default OwnerProfile;