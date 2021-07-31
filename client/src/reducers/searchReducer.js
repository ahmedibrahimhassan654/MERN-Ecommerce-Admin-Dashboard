export const searchReducer = (state = { text: '' }, action) => {
    switch (action.type) {
        case 'SEARCH_QUERY':
            return { ...state, ...action.payload }
        case 'LOG_OUT':
            return action.payload
        default:
            return state
    }
}
