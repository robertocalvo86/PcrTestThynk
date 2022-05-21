import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'

import {
    FormGroup,
    Col,
    Form,
    Row
}
    from 'reactstrap';

import Select from 'react-select';

import { SelectItem, AttachmentFileInfo, CompanyDocumentListItem, CompanyDocumentsFilters, UserIdentity } from '../interfaces';
import { setNotification } from '../service/IdentityUsers';
import { submitCompanyDocument, getAllCompanyDocuments, getCompanyDocumentCategories, deleteCompanyDocument } from '../service/Companies';

const NewBooking = props => {

    const __dispatch = useDispatch();

    const [usrIden, setUsrIden] = useState<UserIdentity | null>(null);

    const [search, setSearch] = useState("");
    const [documentCategorySearchDdlValue, setDocumentCategorySearchDdlValue] = useState<SelectItem | null>(null);

    const [filters, setFilters] = useState<CompanyDocumentsFilters>({ searchText: "", companyDocumentTypeId: -1, pageNumber: 0 });

    const [companyDocumentsState, setCompanyDocumentsState] = useState<Array<CompanyDocumentListItem>>([]);


    const [documentName, setDocumentName] = useState("");
    const [documentDescription, setDocumentDescription] = useState("");

    const [documentCategoriesSelect, setDocumentCategoriesSelect] = useState<Array<SelectItem> | null>(null);
    const [documentCategoryDdlValue, setDocumentCategoryDdlValue] = useState<SelectItem | null>(null);

    const [attachmentFileNameDisplayed, setAttachmentFileNameDisplayed] = useState("File...");
    const [attachmentFileInfo, setAttachmentFileInfo] = useState<AttachmentFileInfo | null>(null);
    const [attachmentFile, setAttachmentFile] = useState<string | ArrayBuffer>("");


    const [viewConfirmPopUp, setViewConfirmPopUp] = useState(false);

    const [itemToDeleteRowColor, setItemToDeleteRowColor] = useState("");



    const [viewNewCompanyDocumentPopUp, setViewNewCompanyDocumentPopUp] = useState(false);

    const toggleBtnNewCompanyDocument = () => setViewNewCompanyDocumentPopUp(!viewNewCompanyDocumentPopUp);

    const toggleBtnDeleteUploadSession = (idx) => {
        setViewConfirmPopUp(!viewConfirmPopUp);

        let tr = document.getElementById(`tr_${idx}`);
        if (tr === null) return;
        tr.style.backgroundColor = itemToDeleteRowColor;
    }



    useEffect(() => {
        const myFunc = async () => {
            let companyDocumentCategories = await getCompanyDocumentCategories(__dispatch);
            if (companyDocumentCategories) {
                if (companyDocumentCategories.length !== 0) {
                    let dataset = companyDocumentCategories.map((e) => { return { label: e.description, value: e.companyDocumentTypeId } });
                    setDocumentCategoriesSelect(dataset);
                }

                let companyDocumentList = await getAllCompanyDocuments(__dispatch, filters);
                if (companyDocumentList) {
                    setCompanyDocumentsState(companyDocumentList.companyDocuments);
                 
                }
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

    const onSubmit = async (e) => {
        e.preventDefault();

        if (documentName === "") {
            setNotification(__dispatch, "info", [{ code: "0000", description: "inserisci il Nome" }]);
            return;
        }
        if (!documentCategoryDdlValue) {
            setNotification(__dispatch, "info", [{ code: "0000", description: "seleziona la categoria" }]);
            return;
        }
        if (documentDescription === "") {
            setNotification(__dispatch, "info", [{ code: "0000", description: "inserisci la Descrizione" }]);
            return;
        }

        if (!attachmentFileInfo)
            return;

        if (attachmentFileInfo.size > 1024 * 1024 * 10) {
            setNotification(__dispatch, "info", [{ code: "0000", description: "la dimensione massima per l'allegato è di 10MB" }]);
            return;
        }

        if (attachmentFileInfo.type !== "application/pdf") {
            setNotification(__dispatch, "info", [{ code: "0000", description: "caricare un documento pdf" }]);
            return;
        }

        let result = await submitCompanyDocument(__dispatch,
            {
                file: attachmentFile,
                name: documentName,
                description: documentDescription,
                companyDocumentTypeId: documentCategoryDdlValue.value
            });
        if (result) {

            let companyDocumentList = await getAllCompanyDocuments(__dispatch, { searchText: "", companyDocumentTypeId: -1, pageNumber: 0 });
            if (companyDocumentList) {
                setCompanyDocumentsState(companyDocumentList.companyDocuments);
           
            }

            setDocumentName("");
            setDocumentDescription("");
            setDocumentCategoryDdlValue(null);
            setAttachmentFileNameDisplayed("File...");
            setAttachmentFileInfo(null);
            setAttachmentFile("");
            toggleBtnNewCompanyDocument();
            setNotification(__dispatch, "success", [{ code: "0000", description: "Modulo inserito" }]);
        }
    }


    const onDocumentCategoryChangeDdl = (ddlValue) => {
        setDocumentCategoryDdlValue(ddlValue);
    }






    return (
        <>
            <span style={{ fontSize: "23px" }}>New Booking</span>
            <hr />
            <br />

            <Row style={{ marginBottom: "14px" }}>

                <Col xs={{ size: 12, order: 2 }} sm={{ size: usrIden && usrIden.roles && usrIden.roles.includes("Amministratore") ? 6 : 11, order: 1 }} lg={{ size: usrIden && usrIden.roles && usrIden.roles.includes("Amministratore") ? 9 : 11, order: 1 }}>
                    <Form onSubmit={onSubmit}>

                        <FormGroup row className="my-0">
                            <Col xs="12" sm="12" lg="7">
                                <FormGroup>
                                    <div style={{ width: "250px", display: "inline-block", marginRight: "20px", marginTop: "10px" }}>
                                        <Select
                                            placeholder={"Venue"}
                                            noOptionsMessage={() => 'Nessuna opzione'}
                                            value={documentCategoryDdlValue}
                                            onChange={onDocumentCategoryChangeDdl}
                                            options={documentCategoriesSelect}
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

{/** 
                        <Button type="submit" className="customButton">Inserisci</Button> {' '}
                        <Button className="customButton" onClick={() => toggleBtnNewCompanyDocument()} >Chiudi</Button>
*/}
                    </Form>
                </Col>
            </Row>


        </>
    );

}

export default NewBooking;