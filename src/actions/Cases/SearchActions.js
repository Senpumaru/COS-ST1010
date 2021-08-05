import {
    CASE_SEARCH_RESET,
    CASE_SEARCH_PAGE,
    CASE_SEARCH_PAGE_SIZE,
    CASE_SEARCH_SORT,
    CASE_SEARCH_FILTER_DATE_REGISTER_GTE as CASE_SEARCH_FILTER_DATE_ACQUISITION_GTE,
    CASE_SEARCH_FILTER_DATE_REGISTER_LTE as CASE_SEARCH_FILTER_DATE_ACQUISITION_LTE,
    CASE_SEARCH_FILTER_PERSONAL_NUMBER,
    CASE_SEARCH_FILTER_INSTITUTION,
} from '../../constants/Cases/SearchConstants'

const SERVER_URL = process.env.REACT_APP_API_SERVER;

export const setSearchPage = (page) => async (dispatch) => {
    dispatch(
        {
            type: CASE_SEARCH_PAGE,
            payload: page
        }
    )
}

export const setSearchPageSize = (pageSize) => async (dispatch) => {
    dispatch(
        {
            type: CASE_SEARCH_PAGE_SIZE,
            payload: pageSize
        }
    )
}

export const setSearchSort = (sortColumn) => async (dispatch) => {
    dispatch(
        {
            type: CASE_SEARCH_SORT,
            payload: sortColumn
        }
    )
}

export const setSearchFilterDateAcquisitionGTE = (keyword) => async (dispatch) => {
    dispatch(
        {
            type: CASE_SEARCH_FILTER_DATE_ACQUISITION_GTE,
            payload: keyword
        }
    )

}

export const setSearchFilterDateAcquisitionLTE = (keyword) => async (dispatch) => {
    dispatch(
        {
            type: CASE_SEARCH_FILTER_DATE_ACQUISITION_LTE,
            payload: keyword
        }
    )

}

export const setSearchFilterPersonalNumber = (keyword) => async (dispatch) => {
    dispatch(
        {
            type: CASE_SEARCH_FILTER_PERSONAL_NUMBER,
            payload: keyword
        }
    )

}

export const setSearchFilterinstitution = (keyword) => async (dispatch) => {
    dispatch(
        {
            type: CASE_SEARCH_FILTER_INSTITUTION,
            payload: keyword
        }
    )

}