const initUser = {
    name: '',
    id: ''
}

export default function userReducer(state = initUser, action) {
    switch(action.type) {
        case 'LOGIN': {
            let state = {
                name: action.name,
                id: action.id
            }
        }
    }
}