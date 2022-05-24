import axios from 'axios';
import { setNotification } from './IdentityUsers';
import { CompanyDocumentList, CompanyDocumentCategory, NoticeList, BookingListItem, Venue } from '../interfaces';

let applicationDomain = "";

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    applicationDomain = "https://localhost:44393";
}
else if (process.env.NODE_ENV === "production") {
}

const submitCompanyDocument = async (dispatch, companyDocumentDTO) => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
        return false;
    }

    let ui = JSON.parse(usrIden);
    companyDocumentDTO.IdentityCardNumber = ui.IdentityCardNumber;
    let result = false;

    //axios.defaults.headers.common['Authorization'] = `Bearer ${ui.token}`;
    await axios.post(applicationDomain + `/api/Booking/PostBooking`, companyDocumentDTO)
        .then(response => {
            if (response.status === 204) {
                result = true;
            }
        })
        .catch(error => {
            if (!error.response) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Impossibile connettersi al servizio web" }]);
            }
            else if (error.response.status === 400) {
                setNotification(dispatch, "info", [{ code: "0000", description: error.response.data }]);
            }
            else if (error.response.status === 401) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Problemi interni al servizio web" }]);
            }
        });
    return result;
}

const deleteBooking = async (dispatch, BookingId) => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
        return null;
    }

    let ui = JSON.parse(usrIden);
    let result = null;

    //axios.defaults.headers.common['Authorization'] = `Bearer ${ui.token}`;
    await axios.delete(applicationDomain + `/api/Booking/DeleteBooking?BookingId=${BookingId}`)
        .then(response => {
            if (response.status === 200) {
                result = response.data;
            }
        })
        .catch(error => {
            if (!error.response) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Impossibile connettersi al servizio web" }]);
            }
            else if (error.response.status === 401) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Problemi interni al servizio web" }]);
            }
        });

    return result;
}

const getAllCompanyDocuments = async (dispatch, companyDocumentsFilters): Promise<CompanyDocumentList | null> => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
        return null;
    }

    let ui = JSON.parse(usrIden);
    let result = null;

    axios.defaults.headers.common['Authorization'] = `Bearer ${ui.token}`;
    await axios.get(applicationDomain + `/api/Company/GetAllCompanyDocuments?companyDocumentsFilters=${JSON.stringify(companyDocumentsFilters)}`)
        .then(response => {
            if (response.status === 200) {
                result = response.data;
            }
        })
        .catch(error => {
            if (!error.response) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Impossibile connettersi al servizio web" }]);
            }
            else if (error.response.status === 401) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Problemi interni al servizio web" }]);
            }
        });

    return result;
}

const getCompanyDocument = async (dispatch, companyDocumentId, name) => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
        return false;
    }

    let ui = JSON.parse(usrIden);
    let result = false;

    axios.defaults.headers.common['Authorization'] = `Bearer ${ui.token}`;
    await axios.get(applicationDomain + `/api/Company/GetCompanyDocument?companyDocumentId=${companyDocumentId}`)
        .then(response => {
            const link = document.createElement('a');
            link.href = response.data;
            link.setAttribute('download', `${name}.pdf`);
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            document.body.appendChild(link);
            link.click();
            result = true;
        })
        .catch(error => {
            if (!error.response) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Impossibile connettersi al servizio web" }]);
            }
            else if (error.response.status === 401) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Problemi interni al servizio web" }]);
            }
        });

    return result;
}

const getBookingDates = async (dispatch, venueId): Promise<string[] | null> => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
        return null;
    }

    //let ui = JSON.parse(usrIden);
    let result = null;

    //axios.defaults.headers.common['Authorization'] = `Bearer ${ui.token}`;
    await axios.get(applicationDomain + `/api/Booking/GetBookingDates?VenueId=${venueId}`)
        .then(response => {
            if (response.status === 200) {
                result = response.data;
            }
        })
        .catch(error => {
            if (!error.response) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Impossibile connettersi al servizio web" }]);
            }
            else if (error.response.status === 401) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Problemi interni al servizio web" }]);
            }
        });

    return result;
}

const getBookingTimes = async (dispatch, venueId, date): Promise<string[] | null> => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
        return null;
    }

    //let ui = JSON.parse(usrIden);
    let result = null;

    //axios.defaults.headers.common['Authorization'] = `Bearer ${ui.token}`;
    await axios.get(applicationDomain + `/api/Booking/GetBookingTimes?VenueId=${venueId}&date=${date}`)
        .then(response => {
            if (response.status === 200) {
                result = response.data;
            }
        })
        .catch(error => {
            if (!error.response) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Impossibile connettersi al servizio web" }]);
            }
            else if (error.response.status === 401) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Problemi interni al servizio web" }]);
            }
        });

    return result;
}

const getVenues = async (dispatch): Promise<Venue[] | null> => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
        return null;
    }

    //let ui = JSON.parse(usrIden);
    let result = null;

    //axios.defaults.headers.common['Authorization'] = `Bearer ${ui.token}`;
    await axios.get(applicationDomain + `/api/Booking/GetVenues`)
        .then(response => {
            if (response.status === 200) {
                result = response.data;
            }
        })
        .catch(error => {
            if (!error.response) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Impossibile connettersi al servizio web" }]);
            }
            else if (error.response.status === 401) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Problemi interni al servizio web" }]);
            }
        });

    return result;
}

const getCompanyDocumentCategories = async (dispatch): Promise<CompanyDocumentCategory[] | null> => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
        return null;
    }

    let ui = JSON.parse(usrIden);
    let result = null;

    axios.defaults.headers.common['Authorization'] = `Bearer ${ui.token}`;
    await axios.get(applicationDomain + `/api/Company/GetCompanyDocumentCategories`)
        .then(response => {
            if (response.status === 200) {
                result = response.data;
            }
        })
        .catch(error => {
            if (!error.response) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Impossibile connettersi al servizio web" }]);
            }
            else if (error.response.status === 401) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Problemi interni al servizio web" }]);
            }
        });

    return result;
}

const deleteCompanyDocument = async (dispatch, companyDocumentId) => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
        return false;
    }

    let ui = JSON.parse(usrIden);
    let result = false;

    axios.defaults.headers.common['Authorization'] = `Bearer ${ui.token}`;
    await axios.put(applicationDomain + `/api/Company/PutUpdateDeleteCompanyDocument?companyDocumentId=${companyDocumentId}`)
        .then(response => {
            if (response.status === 204) {
                result = true;
            }
        })
        .catch(error => {
            if (!error.response) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Impossibile connettersi al servizio web" }]);
            }
            else if (error.response.status === 401) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Problemi interni al servizio web" }]);
            }
        });
    return result;
}

const setPCRTestResult = async (dispatch, bookingId, resultTypeId) => {
    /*let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
        return false;
    }

    let ui = JSON.parse(usrIden);*/
    let result = false;

    //axios.defaults.headers.common['Authorization'] = `Bearer ${ui.token}`;
    await axios.put(applicationDomain + `/api/BackOffice/SetPCRTestResult?bookingId=${bookingId}&resultTypeId=${resultTypeId}`)
        .then(response => {
            if (response.status === 204) {
                result = true;
            }
        })
        .catch(error => {
            if (!error.response) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Impossibile connettersi al servizio web" }]);
            }
            else if (error.response.status === 401) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Problemi interni al servizio web" }]);
            }
        });
    return result;
}

const submitNotice = async (dispatch, noticeDTO) => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
        return false;
    }

    let ui = JSON.parse(usrIden);
    let result = false;

    axios.defaults.headers.common['Authorization'] = `Bearer ${ui.token}`;
    await axios.post(`https://localhost:44393/api/Company/PostSubmitNotice`, noticeDTO)
        .then(response => {
            if (response.status === 204) {
                result = true;
            }
        })
        .catch(error => {
            if (!error.response) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Impossibile connettersi al servizio web" }]);
            }
            else if (error.response.status === 400) {
                setNotification(dispatch, "info", [{ code: "0000", description: error.response.data }]);
            }
            else if (error.response.status === 401) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Problemi interni al servizio web" }]);
            }
        });
    return result;
}

const getAllNotices_mod_backOffice = async (dispatch, noticesFilters): Promise<Array<BookingListItem> | null> => {
    /*let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        alert("stop qui");
        setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
        return null;
    }

    let ui = JSON.parse(usrIden);*/

    let result = null;

    
    await axios.get(applicationDomain + `/api/BackOffice/GetBookings`)
        .then(response => {
            if (response.status === 200) {
                result = response.data;
            }
        })
        .catch(error => {
            if (!error.response) {
                setNotification(dispatch, "danger", [{code: "0000", description:"Impossibile connettersi al servizio web"}]);
            }
            else if (error.response.status === 400) {
                setNotification("info", error.response.data);
            }
            else if (error.response.status === 401) {
                setNotification(dispatch, "info", [{code: "0000", description:"Username e/o Password non valide"}]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{code: "0000", description:"Problemi interni al servizio web"}]);
            }
        });
        
    return result;
}

const getAllNotices_mod = async (dispatch, noticesFilters): Promise<Array<BookingListItem> | null> => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        alert("stop qui");
        setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
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
                setNotification(dispatch, "danger", [{code: "0000", description:"Impossibile connettersi al servizio web"}]);
            }
            else if (error.response.status === 400) {
                setNotification("info", error.response.data);
            }
            else if (error.response.status === 401) {
                setNotification(dispatch, "info", [{code: "0000", description:"Username e/o Password non valide"}]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{code: "0000", description:"Problemi interni al servizio web"}]);
            }
        });

    return result;
}
//
const getAllNotices = async (dispatch, noticesFilters): Promise<NoticeList | null> => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        alert("stop qui");
        setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
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
                setNotification(dispatch, "danger", [{code: "0000", description:"Impossibile connettersi al servizio web"}]);
            }
            else if (error.response.status === 400) {
                setNotification("info", error.response.data);
            }
            else if (error.response.status === 401) {
                setNotification(dispatch, "info", [{code: "0000", description:"Username e/o Password non valide"}]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{code: "0000", description:"Problemi interni al servizio web"}]);
            }
        });

    /*
    

    axios.defaults.headers.common['Authorization'] = `Bearer ${ui.token}`;
    await axios.get(`https://localhost:44393/api/Company/GetAllNotices?noticesFilters=${JSON.stringify(noticesFilters)}`)
        .then(response => {
            if (response.status === 200) {
                result = response.data;
            }
        })
        .catch(error => {
            if (!error.response) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Impossibile connettersi al servizio web" }]);
            }
            else if (error.response.status === 401) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Problemi interni al servizio web" }]);
            }
        });
*/
    return result;
}

const getNotice = async (dispatch, noticeId, name) => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
        return false;
    }

    let ui = JSON.parse(usrIden);
    let result = false;

    axios.defaults.headers.common['Authorization'] = `Bearer ${ui.token}`;
    await axios.get(`https://localhost:44393/api/Company/GetNotice?noticeId=${noticeId}`)
        .then(response => {
            const link = document.createElement('a');
            link.href = response.data;
            link.setAttribute('download', `${name}.pdf`);
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            document.body.appendChild(link);
            link.click();
            result = true;
        })
        .catch(error => {
            if (!error.response) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Impossibile connettersi al servizio web" }]);
            }
            else if (error.response.status === 401) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Problemi interni al servizio web" }]);
            }
        });

    return result;
}

const deleteNotice = async (dispatch, noticeId) => {
    let usrIden = sessionStorage.getItem('user');
    if (!usrIden) {
        setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
        return false;
    }

    let ui = JSON.parse(usrIden);
    let result = false;

    axios.defaults.headers.common['Authorization'] = `Bearer ${ui.token}`;
    await axios.put(`https://localhost:44393/api/Company/PutUpdateDeleteNotice?noticeId=${noticeId}`)
        .then(response => {
            if (response.status === 204) {
                result = true;
            }
        })
        .catch(error => {
            if (!error.response) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Impossibile connettersi al servizio web" }]);
            }
            else if (error.response.status === 401) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Utente non autorizzato" }]);
            }
            else if (error.response.status === 500) {
                setNotification(dispatch, "danger", [{ code: "0000", description: "Problemi interni al servizio web" }]);
            }
        });
    return result;
}

export { submitCompanyDocument, getAllCompanyDocuments, getCompanyDocument, getCompanyDocumentCategories, deleteCompanyDocument, submitNotice, getAllNotices, getNotice, deleteNotice, getAllNotices_mod, getVenues, getBookingDates, getBookingTimes, deleteBooking, getAllNotices_mod_backOffice, setPCRTestResult };