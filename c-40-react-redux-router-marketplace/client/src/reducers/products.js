import {LOAD_DATA} from '../constant/ActionTypes';

export default function data(state = [], action){
  switch (action.type) {

    case LOAD_DATA:
      return action.product;

    default:
      return state;
  }
}
