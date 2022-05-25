import axios from 'axios';
import { setNotification } from '../utils';
import { BookingListItem, Venue } from '../interfaces';

let applicationDomain = "";

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    applicationDomain = "https://localhost:44393";
}
else if (process.env.NODE_ENV === "production") {
}

const setPCRTestResult = async (dispatch, bookingId, resultTypeId) => {
    
    let result = false;

    await axios.put(applicationDomain + `/api/BackOffice/SetPCRTestResult?bookingId=${bookingId}&resultTypeId=${resultTypeId}`)
        .then(response => {
            if (response.status === 204) {
                result = true;
            }
        })
        .catch(error => {
            if (!error.response) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Unable to connect to the web service" }]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Internal server error" }]);
            }
        });
    return result;
}

const getBookings = async (dispatch): Promise<Array<BookingListItem> | null> => {

    let result = null;

    await axios.get(applicationDomain + `/api/BackOffice/GetBookings`)
        .then(response => {
            if (response.status === 200) {
                result = response.data;
            }
        })
        .catch(error => {
            if (!error.response) {
                setNotification(dispatch, "danger", [{code: "0000", description:"Unable to connect to the web service"}]);
            }
            else if (error.response.status === 400) {
                setNotification("info", error.response.data);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{code: "0000", description:"Internal server error"}]);
            }
        });
        
    return result;
}

export { getBookings, setPCRTestResult };