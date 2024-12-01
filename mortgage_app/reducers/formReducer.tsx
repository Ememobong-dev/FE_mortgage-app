

interface InputObject {
    value: string;
    error: boolean;
    errorMessage: string;

}

interface InitStateInterface {
    [key: string]: InputObject,
    amount: InputObject;
    term: InputObject;
    rate: InputObject;
    mortgageType: InputObject;
}

type Action =
    { type: "CHANGE_INPUT"; payload: { name: string; value: string } }
    | {
    type: 'UPDATE_ERROR';
    payload: { error: boolean, errorMessage: string, name: string }}
    | { type: "RESET_INPUT" }

export const INITIAL_STATE = {
    amount: {value: "", error: false, errorMessage: ""},
    term: {value: "", error: false, errorMessage: ""},
    rate: {value: "", error: false, errorMessage: ""},
    mortgageType: {value: "", error: false, errorMessage: ""},
}


export const formReducer = (state: InitStateInterface, action: Action) => {
    switch (action.type) {
        case "CHANGE_INPUT" :
            return {
                ...state,
                [action.payload.name]: {
                    ...state[action.payload.name],
                    error: false, errorMessage: "",
                    value: action.payload.value
                }
            }

        case "UPDATE_ERROR":
            return {
                ...state,
                [action.payload.name]: {
                    ...(state[action.payload.name]),
                    error: action.payload.error,
                    errorMessage: action.payload.errorMessage
                }
            }

        case "RESET_INPUT":
            return{
                ...INITIAL_STATE,
            }

        default :
            return state;
    }
}