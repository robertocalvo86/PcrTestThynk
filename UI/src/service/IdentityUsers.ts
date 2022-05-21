import axios from 'axios';
import {Message} from '../interfaces.js';

let applicationDomain = "";

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    applicationDomain = "https://localhost:44393";
}
else if (process.env.NODE_ENV === "production") {
}

const _logout = async (dispatch) => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        return true;
    }

    sessionStorage.removeItem('user');
    return true;
}

//severity: info, danger, success, warning
//messages: string or array of objects where every object has code, description.
//if called without parameters set notification: []
const setNotification = (dispatch, severity = "", messages: Array<Message> = []) => {

    if (severity === "" && messages.length === 0) {
        dispatch({ type: 'SET_NOTIFICATION', notification: [] });
        return;
    }
    
    let notificationArr = [severity, messages];

    dispatch({ type: 'SET_NOTIFICATION', notification: notificationArr });
}

const setLoading = (dispatch, value) => dispatch({ type: 'SET_LOADING', loading: value });


export { _logout, setNotification };