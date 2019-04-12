const initialState = {
    id: null,
    name: '',
    ownersDogs: []
}

const UPDATE_USER = 'UPDATE_USER'
const CLEAR_USER = 'CLEAR_USER'
const UPDATE_OWNERS_DOGS = 'UPDATE_OWNERS_DOGS'

export function updateUser(user) {
    return {
        type: UPDATE_USER,
        payload: user
    }
}

export function clearUser() {
    return {
        type: CLEAR_USER
    }
}

export function updateOwnersDogs(dogs){
    console.log('hit update owners dogs')
    return {
        type: updateOwnersDogs,
        payload: dogs
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case UPDATE_USER:
            const { id, name } = payload
            return { ...state, id, name }
        case CLEAR_USER:
            return { ...state, id:null, name: ''}
        case UPDATE_OWNERS_DOGS:
            const {dogs} = payload;
            return {...state, dogs: dogs}
        default: 
            return state
    }
}
