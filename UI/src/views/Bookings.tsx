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

import { BookingListItem } from '../interfaces';
import { setNotification } from '../utils';
import { getBookingsByIdentityCardNumber, deleteBooking } from '../service/Booking';

// You can see all icons here: https://icons.getbootstrap.com/
import * as Icon from 'react-bootstrap-icons';

const Bookings = props => {

    const __dispatch = useDispatch();

    //eslint-disable-next-line

    const [Bookings, setBookings] = useState<Array<BookingListItem>>([]);

    const [viewConfirmPopUp, setViewConfirmPopUp] = useState(false);
    const [itemToDeleteIdx, setItemToDeleteIdx] = useState(-1);
    const [itemToDeleteRowColor, setItemToDeleteRowColor] = useState("");

    const toggleBtnDeleteBooking = (idx) => {
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
            let bookingList = await getBookingsByIdentityCardNumber(__dispatch);
            if (bookingList) {
                setBookings(bookingList);
            }
        }

        myFunc();
        //eslint-disable-next-line
    }, []);

    const onDeleteBooking = async (idx) => {
        let companyDocument = Bookings[idx];

        let result = await deleteBooking(__dispatch, companyDocument.bookingId);
        if (result) {
            let data = [...Bookings];
            data.splice(idx, 1);
            setBookings(data);
            toggleBtnDeleteBooking(idx);
            setNotification(__dispatch, "success", [{ code: "0000", description: "Booking Deleted Succesfully" }]);
        }
    }

    return (
        <>
            <span style={{ fontSize: "23px" }}>Bookings</span>
            <hr />
            <br />

            {Bookings.length > 0 && <>
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
                        {Bookings.map((data, idx) => (<tr id={`tr_${idx}`} key={idx}>
                            <td>{data.date}</td>
                            <td>{data.venue}</td>
                            <td>{data.status}</td>
                            <td>{data.lastChange}</td>
                            <td >{data.result}</td>
                            <td>{data.resultDate}</td>
                            <td>
                                {data && data.status === 'OnGoing' && <>
                                    {' '}<Button style={{ width: "100px", marginBottom: "5px" }} className="customButtonDanger" onClick={() => toggleBtnDeleteNoticeAndSaveIdx(idx)}><Icon.Trash style={{ verticalAlign: "-2px" }} />{' '}Delete</Button>
                                </>}
                            </td>

                        </tr>))
                        }
                    </tbody>
                </Table>
                <Modal isOpen={viewConfirmPopUp} toggle={toggleBtnDeleteBooking} backdrop="static">
                    <ModalBody>
                        <Label style={{ fontSize: 'medium' }}>
                            <strong> Are you sure you want to delete the selected booking?</strong>
                        </Label>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="customButtonDanger" onClick={() => onDeleteBooking(itemToDeleteIdx)} ><Icon.Trash style={{ verticalAlign: "-2px" }} />{' '}Delete</Button> {' '}
                        <Button className="customButton" onClick={() => toggleBtnDeleteBooking(itemToDeleteIdx)} >Close</Button>
                    </ModalFooter>
                </Modal>
            </>
            }
            {Bookings.length === 0 &&
                <p>No bookings yet</p>
            }
        </>
    );
}

export default Bookings;