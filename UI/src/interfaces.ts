export interface UserIdentity {
	userName: string;
	token: string;
	roles: Array<string>;
	color: number;
}

export interface Message {
	code: string;
	description: string;
}

export interface SelectItem {
	label: string;
	value: number;
}

export interface AttachmentFileInfo{
	name: string;
	size: number;
	type: string;
}

export interface AttachmentUploadSession {
	uploadSessionId: number;
	file: string | ArrayBuffer;
	title: string;
	date: string;
	type: number;
	uploadReport: string;
}

export interface AttachmentUploadSessionList {
	totalPagesNumber: number;
	uploadSessions: Array<AttachmentUploadSession>
}

export interface UploadSessionDetail {
	uploadSessionId: number;
	title: string;
	date: string;
	type: number;
	uploadReport: string;
	fileName: string;
	missingEmployees: Array<string>;
	missingPayrolls: string;
	documentPages: string;
}

export interface EmployeeListItem {
	employeeId: number;
	firstName: string;
	lastName: string;
	fiscalCode: string;
	identificationNumber: string;
	employmentStartDate: string;
}

export interface EmployeeList {
	totalPagesNumber: number;
	employees: Array<EmployeeListItem>
}

export interface Employee {
	employeeId: number | null;
	userName: string,
	password: string | null,
	firstName: string;
	lastName: string;
	fiscalCode: string;
	identificationNumber: string;
	employmentStartDate: string;
	active: boolean | null;
}
export interface EmployeeDocumentsFilters {
	searchText: string;
	identificationNumber: string;
	documentTypeId: number;
	pageNumber: number;
}

export interface EmployeeDocumentListItem {
	employeeDocumentId: number;
	name: string;
	submissionDate: string;
	downloadedByEmployee: boolean;
	firstDownloadByEmployeeDate: string;
}

export interface EmployeeDocumentList {
	employeeFullName: string;
	identificationNumberFound: boolean;
	totalPagesNumber: number;
	employeeDocuments: Array<EmployeeDocumentListItem>
}

export interface CompanyDocumentsFilters {
	searchText: string;
	companyDocumentTypeId: number;
	pageNumber: number;
}

export interface CompanyDocumentListItem {
	companyDocumentId: number;
	name: string;
	description: string;
	submissionDate: string;
	category: string;
}

export interface CompanyDocumentList {
	totalPagesNumber: number;
	companyDocuments: Array<CompanyDocumentListItem>
}

export interface CompanyDocumentCategory {
	companyDocumentTypeId: number;
	description: string;
}

export interface NoticesFilters {
	pageNumber: number;
}

export interface NoticeListItem {
	noticeId: number;
	name: string;
	description: string;
	submissionDate: string;
}

export interface NoticeList {
	totalPagesNumber: number;
	notices: Array<NoticeListItem>
}

export interface BookingListItem {
	bookingId: number;
	date: string;
	venue: string;
	status: string;
	lastChange: string;
	result: string;
	resultDate: string;
}

export interface Venue {
	venueId: number;
	code: string;
	name: string;
}

export interface SelectItemDate {
	label: string;
	value: string;
}