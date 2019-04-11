import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class AddDog extends Component {
    constructor(){
        super()

        this.state={
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



    render(){ console.log(this.state.dogName,this.state.dogAge, this.state.dogWeight, this.state.dogBreed, this.state.dogSpecialNotes, this.state.dogPicture)
        return(
            <>
                <h1>AddDog</h1>
                <h3>What's the puppy like?</h3>
                
                <div style={{'display':'flex', 'flexDirection':"column", 'alignItems':'center'}}>
                    <input placeholder={'Name'} onChange={e=>{this.handleInput('dogName', e.target.value)}}/>
                    <input placeholder={'Age'} onChange={e=>{this.handleInput('dogAge', e.target.value)}}/>
                    <input placeholder={'Weight'} onChange={e=>{this.handleInput('dogWeight', e.target.value)}}/>
                    <input placeholder={'Breed'} onChange={e=>{this.handleInput('dogBreed', e.target.value)}}/>
                    <input placeholder={'Special Notes'} onChange={e=>{this.handleInput('dogSpecialNotes', e.target.value)}}/>
                    <input placeholder={'Picture'} onChange={e=>{this.handleInput('dogPicture', e.target.value)}} />
                </div>

                <div>
                    <Link to='/ownerprofile'>
                        <button>←</button>
                    </Link>
                    <button> | Save</button>
                </div>
                
                    
            </>
        )
    }
}

export default AddDog;