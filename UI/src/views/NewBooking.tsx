import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'

import {
    FormGroup,
    Col,
    Form,
    Row,
    Button
}
    from 'reactstrap';

import Select from 'react-select';

import { SelectItem, SelectItemDate } from '../interfaces';
import { setNotification } from '../utils';
import { postBooking, getVenues, getBookingDates, getBookingTimes } from '../service/Booking';

const NewBooking = props => {

    const __dispatch = useDispatch();

    const [venuesSelect, setVenuesSelect] = useState<Array<SelectItem> | null>(null);
    const [venueDdlValue, setVenueDdlValue] = useState<SelectItem | null>(null);

    const [bookingDatesSelect, setbookingDatesSelect] = useState<Array<SelectItemDate> | null>(null);
    const [bookingDateDdlValue, setBookingDateDdlValue] = useState<SelectItem | null>(null);

    const [bookingTimesSelect, setbookingTimesSelect] = useState<Array<SelectItemDate> | null>(null);
    const [bookingTimeDdlValue, setBookingTimesDdlValue] = useState<SelectItem | null>(null);

    useEffect(() => {
        const myFunc = async () => {
            let venueList = await getVenues(__dispatch);
            if (venueList) {
                if (venueList.length !== 0) {
                    let dataset = venueList.map((e) => { return { label: `${e.code} - ${e.name}`, value: e.venueId } });
                    setVenuesSelect(dataset);
                }
            }
        }

        myFunc();
        //eslint-disable-next-line
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (typeof venueDdlValue?.value === "undefined") {
            setNotification(__dispatch, "info", [{ code: "0000", description: "Select Venue" }]);
            return;
        }
        if (typeof bookingDateDdlValue?.value === "undefined") {
            setNotification(__dispatch, "info", [{ code: "0000", description: "Select Date" }]);
            return;
        }
        if (typeof bookingTimeDdlValue?.value === "undefined") {
            setNotification(__dispatch, "info", [{ code: "0000", description: "Select Time" }]);
            return;
        }

        let result = await postBooking(__dispatch,
            {
                venue: venueDdlValue?.value,
                date: bookingDateDdlValue?.value,
                time: bookingTimeDdlValue?.value,
            });
        if (result) {
            setVenueDdlValue(null);
            setBookingDateDdlValue(null);
            setBookingTimesDdlValue(null);
            setNotification(__dispatch, "success", [{ code: "0000", description: "Booking Entered" }]);
        }
    }

    const onVenueChangeDdl = async (ddlValue) => {

        let dates = await getBookingDates(__dispatch, ddlValue.value);
        if (dates) {
            let dataset = dates.map((e) => { return { label: e, value: e } });
            setbookingDatesSelect(dataset);
        }

        setVenueDdlValue(ddlValue);
    }

    const onBookingDateChangeDdl = async (ddlValue) => {

        let companyDocumentCategories = await getBookingTimes(__dispatch, venueDdlValue?.value, ddlValue.value);
        if (companyDocumentCategories) {
            console.log(companyDocumentCategories);

            let dataset = companyDocumentCategories.map((e) => { return { label: e, value: e } });
            setbookingTimesSelect(dataset);
        }

        setBookingDateDdlValue(ddlValue);
    }

    const onBookingTimeChangeDdl = async (ddlValue) => {
        setBookingTimesDdlValue(ddlValue);
    }

    return (
        <>
            <span style={{ fontSize: "23px" }}>New Booking</span>
            <hr />
            <br />

            <Row style={{ marginBottom: "14px" }}>
                <Col>
                    <Form onSubmit={onSubmit}>
                        <FormGroup row className="my-0">
                            <Col xs="12" sm="12" lg="4">
                                <FormGroup>
                                    <div style={{ width: "250px", display: "inline-block", marginRight: "20px", marginTop: "10px" }}>
                                        <Select
                                            placeholder={"Venue"}
                                            noOptionsMessage={() => 'No option'}
                                            value={venueDdlValue}
                                            onChange={onVenueChangeDdl}
                                            options={venuesSelect}
                                            theme={theme => ({
                                                ...theme,
                                                borderRadius: 4,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: '#DFEFFF',
                                                    primary: 'hsl(0,0%,80%)',
                                                    neutral20: '#e4e7ea',
                                                    neutral30: '#e4e7ea'
                                                },
                                            })}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col xs="12" sm="12" lg="4">
                                <FormGroup>
                                    <div style={{ width: "250px", display: "inline-block", marginRight: "20px", marginTop: "10px" }}>
                                        <Select
                                            placeholder={"Date"}
                                            noOptionsMessage={() => 'No option'}
                                            value={bookingDateDdlValue}
                                            onChange={onBookingDateChangeDdl}
                                            options={bookingDatesSelect}
                                            theme={theme => ({
                                                ...theme,
                                                borderRadius: 4,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: '#DFEFFF',
                                                    primary: 'hsl(0,0%,80%)',
                                                    neutral20: '#e4e7ea',
                                                    neutral30: '#e4e7ea'
                                                },
                                            })}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>
                            <Col xs="12" sm="12" lg="4">
                                <FormGroup>
                                    <div style={{ width: "250px", display: "inline-block", marginRight: "20px", marginTop: "10px" }}>
                                        <Select
                                            placeholder={"Time"}
                                            noOptionsMessage={() => 'No option'}
                                            value={bookingTimeDdlValue}
                                            onChange={onBookingTimeChangeDdl}
                                            options={bookingTimesSelect}
                                            theme={theme => ({
                                                ...theme,
                                                borderRadius: 4,
                                                colors: {
                                                    ...theme.colors,
                                                    primary25: '#DFEFFF',
                                                    primary: 'hsl(0,0%,80%)',
                                                    neutral20: '#e4e7ea',
                                                    neutral30: '#e4e7ea'
                                                },
                                            })}
                                        />
                                    </div>
                                </FormGroup>
                            </Col>
                        </FormGroup>
                        <br /><br />
                        <Button type="submit" className="customButton">Submit</Button> {' '}
                    </Form>
                </Col>
            </Row>
        </>
    );
}

export default NewBooking;