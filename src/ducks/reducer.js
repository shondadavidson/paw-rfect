const initialState = {
    id: null,
    name: '',
    ownersDogs: [],
    show: false,
    searchedZip: 0,
    searchedResults: []
}

const UPDATE_USER = 'UPDATE_USER'
const CLEAR_USER = 'CLEAR_USER'
const UPDATE_OWNERS_DOGS = 'UPDATE_OWNERS_DOGS'
const HIDE_MENU = 'HIDE_MENU'
const TOGGLE_MENU = 'TOGGLE_MENU'
const ZIP_CODE = 'ZIP_CODE'
const ZIP_RESULTS = 'ZIP_RESULTS'

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

export function updateOwnersDogs(dogs) {
    // console.log(dogs)
    return {
        type: UPDATE_OWNERS_DOGS,
        payload: dogs
    }
}

export function hideMenu() {
    return {
        type: HIDE_MENU
    }
}

export function toggleMenu() {
    return {
        type: TOGGLE_MENU
    }
}

export function zipCode(zip) {
    return {
        type: ZIP_CODE,
        payload: zip
    }
}

export function zipResults(results) {
    return {
        type: ZIP_RESULTS,
        payload: results
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case UPDATE_USER:
            const { id, name } = payload
            return { ...state, id, name }
        case CLEAR_USER:
            return { ...state, id: null, name: '' }
        case UPDATE_OWNERS_DOGS:
            // console.log(payload)
            return { ...state, ownersDogs: payload }
        case HIDE_MENU:
            return { ...state, show: false }
        case TOGGLE_MENU:
            return { ...state, show: !state.show }
            case ZIP_CODE:
            return { ...state, searchedZip: payload }
        case ZIP_RESULTS:
            return { ...state, searchedResults: payload }
        default:
            return state
    }
}
