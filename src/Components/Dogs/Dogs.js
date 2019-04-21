import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

class Dogs extends Component {

    render() {
        console.log(this.props)
        const dogList = this.props.ownersDogs.map((dog, i) => {
            const { dog_picture, dog_name, dog_age, weight, breed, dog_gender, special_notes, dog_id, owner_id, deleteDog } = dog
            return (
                <div className='Dogs' key={dog_id} >
            
                {/* <div className='row'> */}
                    <div className='2'>
                        <img className='OwnerProfileDogImage' src={dog_picture} alt='' />
                        <div >
                        </div>
                        <div className='3'>
                            <span className='OwnerProfileDogList'>Name:</span >
                            <span className='OwnerProfileDogText'>{dog_name}</span >
                            <button className='OwnerProfileDogList' onClick={()=>{this.props.deleteDog(dog_id, owner_id)}}>X</button>
                            <span className='OwnerProfileDogList'>Age:</span >
                            <span className='OwnerProfileDogText'>{dog_age}</span >
                            <span className='OwnerProfileDogList'>Weight:</span >
                            <span className='OwnerProfileDogText'>{weight}</span >
                            <span className='OwnerProfileDogList'>Breed:</span >
                            <span className='OwnerProfileDogText'>{breed}</span >
                            <span className='OwnerProfileDogList'>Gender:</span >
                            <span className='OwnerProfileDogText'>{dog_gender}</span >
                            <span className='OwnerProfileDogList'>Special Notes:</span >
                            <p className='OwnerProfileDogText'>{special_notes}</p >
                        </div>
                        <div>
                            {/* <img src={dog_picture} alt=""/> */}






                        </div>
                    </div>
                    {/* </div> */}
                 
                </div>
            )
        })

        return (
            <>
                {dogList}
            </>
        )
    }
}

const mapStateToProps = reduxState => {
    // console.log(reduxState)
    return {
        ownersDogs: reduxState.ownersDogs
    }
}

export default connect(mapStateToProps)(Dogs);
