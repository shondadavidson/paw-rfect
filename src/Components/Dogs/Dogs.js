import React, { Component } from 'react';
import { connect } from 'react-redux';

class Dogs extends Component{

    render(){ 
        // console.log(this.props)
        const dogList = this.props.ownersDogs.map((dog, i)=>{
            const { dog_picture, dog_name, dog_age, weight, breed, dog_gender, special_notes, dog_id } = dog 
            return(
                <div key = {dog_id} style={{'overflow':'auto'}}>
                    <img src={dog_picture} alt='' style={{'width':'85vw'}}/>
                    <div style={{'display':'flex', 'justifyContent':'center'}}>
                        <div>
                            <p>Name:</p>
                            <p>Age:</p>
                            <p>Weight:</p>
                            <p>Breed:</p>
                            <p>Gender:</p>
                            <p>Special Notes:</p>
                        </div>
                        <div>
                            <p>{dog_name}</p>
                            <p>{dog_age}</p>
                            <p>{weight}</p>
                            <p>{breed}</p>
                            <p>{dog_gender}</p>
                            <p>{special_notes}</p>
                        </div>
                    </div>
                </div>
            )
        })
        
        return(
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

export default connect(mapStateToProps) (Dogs);
