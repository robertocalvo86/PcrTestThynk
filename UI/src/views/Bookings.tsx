import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'

import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    Label,
    Table
}
    from 'reactstrap';

import { NoticeListItem, NoticesFilters, UserIdentity, BookingListItem } from '../interfaces';
import { setNotification } from '../service/IdentityUsers';
import { deleteNotice, getAllNotices_mod, deleteBooking } from '../service/Companies';

// You can see all icons here: https://icons.getbootstrap.com/
import * as Icon from 'react-bootstrap-icons';

const Bookings = props => {

    const __dispatch = useDispatch();

    const [usrIden, setUsrIden] = useState<UserIdentity | null>(null);

    //eslint-disable-next-line
    const [filters, setFilters] = useState<NoticesFilters>({ pageNumber: 0 });

    const [NoticesState, setNoticesState] = useState<Array<NoticeListItem>>([]);
    const [NoticesStatemod, setNoticesStatemod] = useState<Array<BookingListItem>>([]);


    const [viewConfirmPopUp, setViewConfirmPopUp] = useState(false);
    const [itemToDeleteIdx, setItemToDeleteIdx] = useState(-1);
    const [itemToDeleteRowColor, setItemToDeleteRowColor] = useState("");


    const toggleBtnDeleteNotice = (idx) => {
        setViewConfirmPopUp(!viewConfirmPopUp);

        let tr = document.getElementById(`tr_${idx}`);
        if (tr === null) return;
        tr.style.backgroundColor = itemToDeleteRowColor;
    }

    const toggleBtnDeleteNoticeAndSaveIdx = (idx) => {
        setViewConfirmPopUp(!viewConfirmPopUp);
        setItemToDeleteIdx(idx);

        let tr = document.getElementById(`tr_${idx}`);
        if (tr === null) return;
        setItemToDeleteRowColor(tr.style.backgroundColor);
        tr.style.backgroundColor = "#DFEFFF";
    }

    useEffect(() => {
        const myFunc = async () => {
            let noticeList = await getAllNotices_mod(__dispatch, filters);
            if (noticeList) {
                setNoticesStatemod(noticeList);
            }
        }

        document.title = "Pcr Test Bookings";

        let usrIdenObject = null;
        let usrIden = sessionStorage.getItem('user');
        if (usrIden) {
            usrIdenObject = JSON.parse(usrIden);
            setUsrIden(usrIdenObject);
        }

        myFunc();
        //eslint-disable-next-line
    }, []);

    const onDeleteNotice = async (idx) => {
        let companyDocument = NoticesStatemod[idx];

        let result = await deleteBooking(__dispatch, companyDocument.bookingId);
        if (result) {
            let data = [...NoticesStatemod];
            data.splice(idx, 1);
            setNoticesStatemod(data);
            toggleBtnDeleteNotice(idx);
            setNotification(__dispatch, "success", [{ code: "0000", description: "Booking Deleted Succesfully" }]);
        }
    }

    return (
        <>
            <span style={{ fontSize: "23px" }}>Bookings</span>
            <hr />
            <br />

            {NoticesStatemod.length > 0 && <>
                <br />
                <Table responsive bordered>
                    <thead style={{ backgroundColor: "#EEEFEF" }}>
                        <tr>
                            <th>Date</th>
                            <th>Venue</th>
                            <th>Status</th>
                            <th>LastChange</th>
                            <th>Result</th>
                            <th>ResultDate</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {NoticesStatemod.map((data, idx) => (<tr id={`tr_${idx}`} key={idx}>
                            <td>{data.date}</td>
                            <td>{data.venue}</td>
                            <td>{data.status}</td>
                            <td>{data.lastChange}</td>
                            <td >{data.result}</td>
                            <td>{data.resultDate}</td>
                            
                            <td>
                                {/*<Button onClick={() => onDownloadAttachment(idx)} className="customButtonToDownload" style={{ paddingLeft: "20px", paddingRight: "20px", marginBottom: "5px" }} ><Icon.Download /></Button>*/}
                                {data && data.status === 'OnGoing' && <>
                                    {' '}<Button style={{ width: "100px", marginBottom: "5px" }} className="customButtonDanger" onClick={() => toggleBtnDeleteNoticeAndSaveIdx(idx)}><Icon.Trash style={{ verticalAlign: "-2px" }} />{' '}Delete</Button>
                                 </>}
                            </td>
                           
                        </tr>))
                        }
                    </tbody>
                </Table>
                <Modal isOpen={viewConfirmPopUp} toggle={toggleBtnDeleteNotice} backdrop="static">
                    <ModalBody>
                        <Label style={{ fontSize: 'medium' }}>
                            <strong> Are you sure you want to delete the selected booking?</strong>
                        </Label>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="customButtonDanger" onClick={() => onDeleteNotice(itemToDeleteIdx)} ><Icon.Trash style={{ verticalAlign: "-2px" }} />{' '}Delete</Button> {' '}
                        <Button className="customButton" onClick={() => toggleBtnDeleteNotice(itemToDeleteIdx)} >Close</Button>
                    </ModalFooter>
                </Modal>
            </>
            }
            {NoticesStatemod.length === 0 &&
                <p>No bookings yet</p>
            }
        </>
    );
}

export default Bookings;