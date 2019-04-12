import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';

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

    save = async() => { 
        // console.log(this.props.id)
        const {id} = this.props;
        let newDog ={
            dogName: this.state.dogName,
            dogAge: this.state.dogAge,
            dogWeight: this.state.dogWeight,
            dogBreed: this.state.dogBreed,
            dogGender: this.state.dogGender,
            dogSpecialNotes: this.state.dogSpecialNotes,
            dogPicture: this.state.dogPicture
        }
        let dogs = await axios.post(`/api/addDog/${id}`, newDog);
        console.log({dogs: dogs})
    }

    render(){ console.log(this.state.dogName, this.state.dogAge, this.state.dogWeight, this.state.dogBreed, this.state.dogGender,  this.state.dogSpecialNotes, this.state.dogPicture,{this:this}, {id:this.props.id})
        return(
            <>
                <h1>AddDog</h1>
                <h3>What's the puppy like?</h3>
                
                <div style={{'display':'flex', 'flexDirection':"column", 'alignItems':'center'}}>
                    <input type='text' placeholder={'Name'} onChange={e=>{this.handleInput('dogName', e.target.value)}}/>
                    <input type='integer' placeholder={'Age'} onChange={e=>{this.handleInput('dogAge', e.target.value)}}/>
                    <input type='integer' placeholder={'Weight'} onChange={e=>{this.handleInput('dogWeight', e.target.value)}}/>
                    <input type='text' placeholder={'Breed'} onChange={e=>{this.handleInput('dogBreed', e.target.value)}}/>
                    <input type='text' placeholder={'Gender'} onChange={e=>{this.handleInput('dogGender', e.target.value)}}/>
                    <input type='text' placeholder={'Special Notes'} onChange={e=>{this.handleInput('dogSpecialNotes', e.target.value)}}/>
                    <input type='text' placeholder={'Picture'} onChange={e=>{this.handleInput('dogPicture', e.target.value)}} />
                </div>

                <div>
                    <Link to='/ownerprofile'>
                        <button>←</button>
                    </Link>
                    <button onClick={()=>{this.save(this.props)}}> | Save</button>
                </div>
                
                    
            </>
        )
    }
}

const mapStateToProps = reduxState => {
    return {
        id: reduxState.id
    }
}

export default connect(mapStateToProps) (AddDog);