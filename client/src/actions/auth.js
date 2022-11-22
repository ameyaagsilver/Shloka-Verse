import * as api from '../api';
import { AUTH, LOGOUT } from '../constants/actionTypes';


export const signin = (formData, navigate, toast) => async(dispatch) => {

    try {
        const { data } = await api.signIn(formData);
        dispatch({type: AUTH, data});
        
        navigate('/');
    } catch (error) {
        // console.log(error);
        toast.error("Unable to sign you in")
        toast.error(error?.response?.data?.message)
    }
}

export const signup = (formData, navigate, toast) => async(dispatch) => {

    try {
        const { data } = await api.signUp(formData);
        dispatch({type: AUTH, data});
        
        navigate('/');
    } catch (error) {
        // console.log(error);
        toast.error(error?.response?.data?.message)
    }
}