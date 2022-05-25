import axios from 'axios';
import { setNotification } from '../utils';
import { BookingListItem, Venue } from '../interfaces';

let applicationDomain = "";

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    applicationDomain = "https://localhost:44393";
}
else if (process.env.NODE_ENV === "production") {
}

const postBooking = async (dispatch, companyDocumentDTO) => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        setNotification(dispatch, "danger", [{ code: "0000", description: "Unauthorized user" }]);
        return false;
    }

    let ui = JSON.parse(usrIden);
    companyDocumentDTO.IdentityCardNumber = ui.IdentityCardNumber;
    let result = false;

    await axios.post(applicationDomain + `/api/Booking/PostBooking`, companyDocumentDTO)
        .then(response => {
            if (response.status === 204) {
                result = true;
            }
        })
        .catch(error => {
            if (!error.response) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Unable to connect to the web service" }]);
            }
            else if (error.response.status === 400) {
                setNotification(dispatch, "info", [{ code: "0000", description: error.response.data }]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Internal server error" }]);
            }
        });
    return result;
}

const deleteBooking = async (dispatch, BookingId) => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        setNotification(dispatch, "danger", [{ code: "0000", description: "Unauthorized user" }]);
        return null;
    }
    let result = null;

    await axios.delete(applicationDomain + `/api/Booking/DeleteBooking?BookingId=${BookingId}`)
        .then(response => {
            if (response.status === 200) {
                result = response.data;
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

const getBookingDates = async (dispatch, venueId): Promise<string[] | null> => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        setNotification(dispatch, "danger", [{ code: "0000", description: "Unauthorized user" }]);
        return null;
    }

    let result = null;

    await axios.get(applicationDomain + `/api/Booking/GetBookingDates?VenueId=${venueId}`)
        .then(response => {
            if (response.status === 200) {
                result = response.data;
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

const getBookingTimes = async (dispatch, venueId, date): Promise<string[] | null> => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        setNotification(dispatch, "danger", [{ code: "0000", description: "Unauthorized user" }]);
        return null;
    }

    let result = null;

    await axios.get(applicationDomain + `/api/Booking/GetBookingTimes?VenueId=${venueId}&date=${date}`)
        .then(response => {
            if (response.status === 200) {
                result = response.data;
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

const getVenues = async (dispatch): Promise<Venue[] | null> => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        setNotification(dispatch, "danger", [{ code: "0000", description: "Unauthorized user" }]);
        return null;
    }

    let result = null;

    await axios.get(applicationDomain + `/api/Booking/GetVenues`)
        .then(response => {
            if (response.status === 200) {
                result = response.data;
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

const getBookingsByIdentityCardNumber = async (dispatch): Promise<Array<BookingListItem> | null> => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        alert("stop qui");
        setNotification(dispatch, "danger", [{ code: "0000", description: "Unauthorized user" }]);
        return null;
    }

    let ui = JSON.parse(usrIden);

    let result = null;

    
    await axios.get(applicationDomain + `/api/Booking/GetBookingsByIdentityCardNumber?IdentityCardNumber=${ui.IdentityCardNumber}`)
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



export { postBooking, getBookingsByIdentityCardNumber, getVenues, getBookingDates, getBookingTimes, deleteBooking };