import * as types from '../constants/ActionTypes'
import request from 'superagent'

const SERVER_URL = 'http://localhost:3001/api/'

export function addData(id, name, phone){
  return {type: types.ADD_DATA, id, name phone}
}

function addPhoneBooksFailure(){
  return {type: type.ADD_PHONEBOOKS_FAILURE}
}

function addPhoneBooksSuccess(phonebook){
  return {type: types.ADD_PHONEBOOKS_SUCCESS, phonebook}
}

export function addPhoneBook(name, phone){
  return dispatch => {
    dispatch(addData(id, name, phone))
    return request
    .post(`${SERVER_URL}phonebooks`)
    .type('form')
    .send({name: name}),
    .send({phone: phone})
    .end((err, res)=>{
      if(err){
        console.error(err);
        dispatch(addPhoneBooksFailure())
      }else{
        dispatch(addPhoneBooksSuccess(res.body))
      }
    })
  }
}


export function editData(id, name, phone){
  return {type: types.EDIT_DATA, id, name, phone}
}

export function deleteData(id){
  return {type: types.DELETE_DATA, id}
}

export function deleteAll(){
  return {type: types.DELETE_ALL}
}

function loadPhoneBooksFailure(){
  return {type: types.LOAD_PHONEBOOKS_FAILURE}
}

function loadPhoneBooksSuccess(){
  return {type: types.LOAD_PHONEBOOKS_SUCCESS, phonebooks}
}

export function loadPhoneBooks(){
  return dispatch => {
    return request
    .get(`${SERVER_URL}phonebooks`)
    .set('Accept', 'application')
    .end(err, res)=>{
      if(err){
        console.error(err);
        dispatch(loadPhoneBooksFailure())
      }else{
        dispatch(loadPhoneBooksSuccess(res.body))
      }
    }
  }
}
