import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

class Dogs extends Component {

    render() {
        console.log(this.props)
        const dogList = this.props.ownersDogs.map((dog, i) => {
            const { dog_picture, dog_name, dog_age, weight, breed, dog_gender, special_notes, dog_id, owner_id, deleteDog } = dog
            return (
                // <div className='col-12 col-md-3'>
                // <div className='row'>
                <div className='col-12 col-md-5'>
                <div className='Dogs' key={dog_id}  >
            
                {/* <div className='row'> */}
                    <div id='DogBackground' style={{backgroundImage:`url(${dog_picture})`, } }>
                        <div className='dogList'>
                    
                        <img className='OwnerProfileDogImage' src={dog_picture} alt='' />
                        <button className='OwnerProfileDogListEdit' onClick={()=>{this.props(dog_id, owner_id)}}><i class="fas fa-minus-circle"></i></button>
                      
                        <button className='OwnerProfileDogListEdit' onClick={()=>{this.props.deleteDog(dog_id, owner_id)}}><i class="far fa-edit"></i></button>
                        <div >
                        </div>
                        
                        <span className='OwnerProfileDogList'>Name:</span >
                            <span className='OwnerProfileDogText'>{dog_name}</span >
                            
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
                        
                        <div>
                            {/* <img src={dog_picture} alt=""/> */}



</div>

</div>
                        </div>
                
                    {/* </div> */}
                 
                </div>
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
