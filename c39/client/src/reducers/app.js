import {ADD_DATA, EDIT_DATA, DELETE_DATA, DELETE_ALL, LOAD_PHONEBOOKS_SUCCESS, LOAD_PHONEBOOKS_FAILURE, ADD_PHONEBOOKS_SUCCESS, ADD_PHONEBOOKS_FAILURE} from '../constants/ActionTypes'

export default function data(state = [], action){
  switch(action.type){

    case ADD_PHONEBOOKS_SUCCESS:
    let idObject = state.map(function(x){
      return x.id;
    }).indexOf(parseInt(action.phonebooks.id)) > -1;

    if(idObject){
      return state;
    }else{
      return [...state, action.phonebooks]
    }

    case LOAD_PHONEBOOKS_SUCCESS:
    return action.phonebooks;

    case ADD_DATA:
    return [
      ...state,
      {
        id: action.id,
        name: action.name,
        phone: action.phone
      }
    ]

    case EDIT_DATA:
    return state.map(data => data.id === action.id ? Object.assign({}, data, {name: action.name, phone: action.phone}) : data)

    case DELETE_DATA:
    return state.filter(data => data.id !== action.id)

    case DELETE_ALL:
    return []

    case LOAD_PHONEBOOKS_FAILURE:
    return state;

    default:
    return state;
  }
}
