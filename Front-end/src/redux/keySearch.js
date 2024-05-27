export const setSearchTerm = (term) => {
    return {
        type: "SET_SEARCH_TERM",
        payload: term
    };
};
const initialState = {
    searchTerm: ""
};

const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SEARCH_TERM":
            return {
                ...state,
                searchTerm: action.payload
            };
        default:
            return state;
    }
};

export default searchReducer;