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
import { getBookings, setPCRTestResult } from '../service/BackOffice';

// You can see all icons here: https://icons.getbootstrap.com/
import * as Icon from 'react-bootstrap-icons';

const BackOffice = props => {

    const __dispatch = useDispatch();

    //eslint-disable-next-line

    const [Bookings, setBookings] = useState<Array<BookingListItem>>([]);

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
            let bookingList = await getBookings(__dispatch);
            if (bookingList) {
                setBookings(bookingList);
            }
        }

        myFunc();
        //eslint-disable-next-line
    }, []);

    const onSetPCRTestResult = async (idx, resultTypeId) => {
        let companyDocument = Bookings[idx];

        let result = await setPCRTestResult(__dispatch, companyDocument.bookingId, resultTypeId);
        if (result) {
            let data = [...Bookings];
            data.splice(idx, 1);
            setBookings(data);
            toggleBtnDeleteNotice(idx);
            setNotification(__dispatch, "success", [{ code: "0000", description: "Booking Deleted Succesfully" }]);
        }
    }

    return (
        <div style={{ padding: "50px" }}>

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
                                    <td>{data.result}</td>
                                    <td>{data.resultDate}</td>

                                    <td>
                                        {/*<Button onClick={() => onDownloadAttachment(idx)} className="customButtonToDownload" style={{ paddingLeft: "20px", paddingRight: "20px", marginBottom: "5px" }} ><Icon.Download /></Button>*/}
                                        {data && data.status === 'OnGoing' && <>
                                            {' '}
                                            <Button style={{margin:"0 auto", display:"block"}} className="customButton" onClick={() => toggleBtnDeleteNoticeAndSaveIdx(idx)}><Icon.PenFill style={{ verticalAlign: "-2px" }} />{' '}Result</Button>
                                        </>}
                                    </td>

                                </tr>))
                                }
                            </tbody>
                        </Table>
                        <Modal isOpen={viewConfirmPopUp} toggle={toggleBtnDeleteNotice} backdrop="static">
                            <ModalBody>
                                <Label style={{ fontSize: 'medium' }}>
                                    <strong>Set result of the PCR Test</strong>
                                </Label>
                            </ModalBody>
                            <ModalFooter>
                                <Button className="customButtonDanger" onClick={() => onSetPCRTestResult(itemToDeleteIdx, 1)} >Positive</Button> {' '}
                                <Button className="customButton" onClick={() => onSetPCRTestResult(itemToDeleteIdx, 2)} >Negative</Button>
                            </ModalFooter>
                        </Modal>
                    </>
                    }
                    {Bookings.length === 0 &&
                        <p>No bookings yet</p>
                    }

        </div>
    );
}

export default BackOffice;