import {
  CASE_SEARCH_PAGE,
  CASE_SEARCH_PAGE_SIZE,
  CASE_SEARCH_SORT,
  CASE_SEARCH_FILTER_DATE_REGISTER_GTE,
  CASE_SEARCH_FILTER_DATE_REGISTER_LTE,
  CASE_SEARCH_FILTER_PERSONAL_NUMBER,
  CASE_SEARCH_FILTER_INSTITUTION,
  CASE_SEARCH_RESET,

} from '../../constants/Cases/SearchConstants'

const currentDate = new Date();

const initialStateSearch = {
  page: 1,
  pageSize: 10,
  sortColumn: "-date_of_registration",

  filters: {
    "dateRegisterGTE": currentDate,
    "dateRegisterLTE": currentDate,
    "personalNumber": "",
    "institution": ""
  }
}

/*** Search Page ***/
export const searchReducerALK = (state = initialStateSearch, action) => {
  switch (action.type) {
    case CASE_SEARCH_PAGE:
      return {
        ...state,
        page: action.payload
      }
    case CASE_SEARCH_PAGE_SIZE:
      return {
        ...state,
        page: 1,
        pageSize: action.payload
      }
    case CASE_SEARCH_SORT:
      return {
        ...state,
        sortColumn: action.payload
      }
    case CASE_SEARCH_FILTER_DATE_REGISTER_GTE:
      return {
        ...state,
        page: 1,
        filters: {
          "dateRegisterGTE": action.payload,
          "dateRegisterLTE": state.filters.dateRegisterLTE,

          "institution": state.filters.institution
        }
      }

    case CASE_SEARCH_FILTER_DATE_REGISTER_LTE:
      return {
        ...state,
        page: 1,
        filters: {
          "dateRegisterGTE": state.filters.dateRegisterGTE,
          "dateRegisterLTE": action.payload,

          "institution": state.filters.institution
        }
      }
    case CASE_SEARCH_FILTER_PERSONAL_NUMBER:
      return {
        ...state,
        page: 1,
        filters: {
          "dateRegisterGTE": state.filters.dateRegisterGTE,
          "dateRegisterLTE": state.filters.dateRegisterLTE,

          "institution": state.filters.institution
        }
      }
    case CASE_SEARCH_FILTER_INSTITUTION:
      return {
        ...state,
        page: 1,
        filters: {
          "dateRegisterGTE": state.filters.dateRegisterGTE,
          "dateRegisterLTE": state.filters.dateRegisterLTE,

          "institution": action.payload
        }
      }
    case CASE_SEARCH_RESET:
      return []
    default:
      return state;
  }
}
