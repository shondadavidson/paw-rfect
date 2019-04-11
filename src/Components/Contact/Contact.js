import React from 'react'

export default function() {
    return (
        <div>
            <h3>Contact Us</h3>
            <h5>Submit your Questions and Concerns</h5>
            <input type="text" placeholder='Full Name'/>
            <input type="text" placeholder='email'/>
            <textarea type="text" placeholder='Your concern'></textarea>
            <button>Submit</button>
        </div>
    )
}