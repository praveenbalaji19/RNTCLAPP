const initialState = {
    userList: []
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER_LIST": {
            return {
                ...state,
                userList: action.data
            }
        }
        default: {
            return {
                state
            }
        }
    }
}