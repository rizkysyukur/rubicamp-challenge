import {LOAD_DATA, ADD_DATA} from '../constants/ActionTypes';

export default function data(state = [], action){
  switch (action.type) {

    case LOAD_DATA:
      return action.product;

    default:
      return state;
  }
}
