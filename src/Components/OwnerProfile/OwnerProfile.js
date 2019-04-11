import React, {Component} from 'react';
import { connect } from 'react-redux';
import { updateUser } from './../../ducks/reducer';

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

    componentDidMount(){
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
            [prop]:val
        })
    }

    save = () => {

    }

    render(){ const save = <button onClick={e=> {this.save()}}>Save</button>
    console.log(this)
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
                    <img src={this.state.ownerPicture} alt=''/>
                    <input placeholder={'Zip Code'} value={this.state.ownerZip} readOnly/>
                </div>}




                <div>
                    <div>DOG</div>
                </div>
                <div>
                    <button onClick={()=>{this.props.history.push('/adddog')}}>+ Add Dog</button>
                </div>
                <div>
                    {!this.state.editing && <button onClick={()=>(this.props.history.push('/home'))}>Back</button>}
                    {this.state.editing && <button onClick={()=>(this.toggle('editing'))}>Back</button>}
                    {!this.state.editing && save}
                    <button onClick={()=> this.toggle('editing')}> {this.state.editing ? 'Update' : 'Edit Profile'} </button>
                </div>

            </>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        name: reduxState.name
    }
}

export default connect(mapStateToProps) (OwnerProfile);