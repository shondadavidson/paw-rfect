import React from 'react'

export default function () {
    return (
        <div className='Contact'>
        <h3>Contact Us</h3>
            <h5>Submit your Questions and Concerns</h5>
        <div className='col-11 col-sm-8 col-md-6 col-md-lg-5'>
            
            <input type="text" placeholder='Full Name' />
            <input type="text" placeholder='email' />
        </div>
        <div className='col-12 col-sm-12 col-md-12'>
            <textarea className='ContactConcern' type="text" placeholder='Your concern'></textarea>
            </div>
            <div>
            <button>Submit</button>

        </div >
        </div>
    )
}