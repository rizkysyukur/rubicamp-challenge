import * as types from '../constant/ActionTypes';
import superagent from 'superagent';

const SERVER_URL = 'http://localhost:3005/api/';

function loadDataSuccess(product){
  return {type: types.LOAD_DATA, product}
}

export function loadData(){
  return dispatch => {
    return superagent
    .get(`${SERVER_URL}product`)
    .set('Accept', 'application/json')
    .end((err, res) => {
      if(err){
        console.log(err.message);
      }else{
        dispatch(loadDataSuccess(res));
      }
    })
  }
}
