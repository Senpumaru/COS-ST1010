import axios from "axios";
import {
  CASE_CREATE_FAIL,
  CASE_CREATE_REQUEST,
  CASE_CREATE_SUCCESS,
  CASE_CREATE_RESET,
  CASE_TRANSFER_FAIL,
  CASE_TRANSFER_REQUEST,
  CASE_TRANSFER_SUCCESS,
  CASE_ADDENDUM_REQUEST,
  CASE_ADDENDUM_SUCCESS,
  CASE_ADDENDUM_FAIL,
  APPROVAL_UPDATE_FAIL,
  APPROVAL_UPDATE_REQUEST,
  APPROVAL_UPDATE_SUCCESS,
  CASE_DETAILS_FAIL,
  CASE_DETAILS_REQUEST,
  CASE_DETAILS_RESET,
  CASE_DETAILS_SUCCESS,
  CASE_DELETE_FAIL,
  CASE_DELETE_REQUEST,
  CASE_DELETE_SUCCESS,
  CASE_LIST_FAIL,
  CASE_LIST_REQUEST,
  CASE_LIST_SUCCESS,
  CASE_UPDATE_FAIL,
  CASE_UPDATE_REQUEST,
  CASE_UPDATE_SUCCESS,
  CASE_UPDATE_RESET,
  CASE_STATISTICS_REQUEST,
  CASE_STATISTICS_SUCCESS,
  CASE_STATISTICS_FAIL,
} from "../../constants/Cases/CaseConstants";

const SERVER_URL = process.env.REACT_APP_API_SERVER;

export const createCase = (instance) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CASE_CREATE_REQUEST,
    });

    const state = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${state["Profile"].userLogin["userInfo"].access}`,
      },
    };

    const { data } = await axios.post(
      SERVER_URL + "api/ST1010/cases/create/",
      instance,
      config // Credentials etc.
    );

    setTimeout(() => {
      dispatch({
        type: CASE_CREATE_SUCCESS,
        payload: data,
      });
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: CASE_CREATE_FAIL,
        payload: error.response && error.response.data.Detail ? error.response.data.Detail : error.message,
      });
    }, 1000);
  }
};

export const caseDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CASE_DETAILS_REQUEST,
    });

    const state = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${state["Profile"].userLogin["userInfo"].access}`,
      },
    };

    // ID is specified in API URL
    const { data } = await axios.get(SERVER_URL + `api/ST1010/cases/${id}/update/`, config);

    setTimeout(() => {
      dispatch({
        type: CASE_DETAILS_SUCCESS,
        payload: data,
      });
    }, 2000);
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: CASE_DETAILS_FAIL,
        payload: error.response && error.response.data.Detail ? error.response.data.Detail : error.message,
      });
    }, 2000);
  }
};

export const caseTransferAction = (instance) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CASE_TRANSFER_REQUEST,
    });

    const state = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${state["Profile"].userLogin["userInfo"].access}`,
      },
    };

    const { data } = await axios.put(SERVER_URL + `api/ST1010/cases/${instance.uuid}/transfer/`, instance, config);

    setTimeout(() => {
      dispatch({
        type: CASE_TRANSFER_SUCCESS,
        payload: data,
      });
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: CASE_TRANSFER_FAIL,
        payload: error.response && error.response.data.Detail ? error.response.data.Detail : error.message,
      });
    }, 2000);
  }
};

export const approvalUpdateAction = (instance) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPROVAL_UPDATE_REQUEST,
    });

    const state = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${state["Profile"].userLogin["userInfo"].access}`,
      },
    };

    const { data } = await axios.put(SERVER_URL + `api/ST1010/approval/${instance.id}/update/`, instance, config);

    setTimeout(() => {
      dispatch({
        type: APPROVAL_UPDATE_SUCCESS,
        payload: data,
      });
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: APPROVAL_UPDATE_FAIL,
        payload: error.response && error.response.data.Detail ? error.response.data.Detail : error.message,
      });
    }, 2000);
  }
};

export const caseUpdateAction = (instance) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CASE_UPDATE_REQUEST,
    });

    const state = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${state["Profile"].userLogin["userInfo"].access}`,
      },
    };

    const { data } = await axios.put(SERVER_URL + `api/ST1010/cases/${instance.uuid}/update/`, instance, config);
    setTimeout(() => {
      dispatch({
        type: CASE_UPDATE_SUCCESS,
        payload: data,
      });
    }, 1000);

    setTimeout(() => {
      dispatch({
        type: CASE_UPDATE_RESET,
      });
    }, 5000);

    dispatch({
      type: CASE_DETAILS_RESET,
    });
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: CASE_UPDATE_FAIL,
        payload: error.response && error.response.data.Detail ? error.response.data.Detail : error.message,
      });
    }, 2000);
  }
};

export const caseAddendumAction = (uuid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CASE_ADDENDUM_REQUEST,
    });

    const state = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${state["Profile"].userLogin["userInfo"].access}`,
      },
    };

    const { data } = await axios.put(SERVER_URL + `api/ST1010/cases/${uuid}/addendum/`, uuid, config);
    setTimeout(() => {
      dispatch({
        type: CASE_ADDENDUM_SUCCESS,
        payload: data,
      });
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: CASE_ADDENDUM_FAIL,
        payload: error.response && error.response.data.Detail ? error.response.data.Detail : error.message,
      });
    }, 2000);
  }
};

export const caseDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CASE_DELETE_REQUEST,
    });

    const state = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${state["Profile"].userLogin["userInfo"].access}`,
      },
    };

    await axios.delete(SERVER_URL + `api/ST1010/cases/${id}/update/`, config);

    dispatch({
      type: CASE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CASE_DELETE_FAIL,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
  }
};

export const listCases = (
  page = 1,
  pageSize = 10,
  sortColumn = "date_of_acquisition",
  filterDateRegisterGTE = null,
  filterDateRegisterLTE = null,
  filterInstitution = ""
) => {
  return async function (dispatch, getState) {
    // Promise
    try {
      // Request Promise
      dispatch({
        type: CASE_LIST_REQUEST,
      });
      // Promise Async action

      const baseUrl = SERVER_URL + "api/ST1010/cases/list/";
      const pageVar = `?page=${page}`;
      const pageSizeVar = `&page_size=${pageSize}`;
      const sortColumnVar = `&ordering=${sortColumn}`;
      var filterDateRegisterGTEVar = "";
      if (filterDateRegisterGTE != null) {
        filterDateRegisterGTEVar = `&date_of_acquisition_gte=${filterDateRegisterGTE}`;
      } else {
        filterDateRegisterGTEVar = "";
      }
      const filterDateRegisterLTEVar = `&date_of_acquisition_lte=${filterDateRegisterLTE}`;
      const filterInstitutionVar = `&institution_code=${filterInstitution}`;

      const url = baseUrl.concat(
        pageVar,
        pageSizeVar,
        sortColumnVar,
        filterDateRegisterGTEVar,
        filterDateRegisterLTEVar,
        filterInstitutionVar
      );

      const state = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state["Profile"].userLogin["userInfo"].access}`,
        },
      };

      const { data } = await axios.get(url, config);
      // Deliver Promise

      setTimeout(() => {
        dispatch({
          type: CASE_LIST_SUCCESS,
          payload: data,
        });
      }, 1000);

      // Error
    } catch (error) {
      dispatch({
        type: CASE_LIST_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message,
      });
    }
  };
};

export const statisticsCases = () => {
  return async function (dispatch, getState) {
    // Promise
    try {
      // Request Promise
      dispatch({
        type: CASE_STATISTICS_REQUEST,
      });
      // Promise Async action
      const state = getState();

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${state["Profile"].userLogin["userInfo"].access}`,
        },
      };

      const { data } = await axios.get(SERVER_URL + "api/ST1010/cases/statistics/", config);
      // Deliver Promise

      setTimeout(() => {
        dispatch({
          type: CASE_STATISTICS_SUCCESS,
          payload: data,
        });
      }, 1000);

      // Error
    } catch (error) {
      dispatch({
        type: CASE_STATISTICS_FAIL,
        payload: error.response && error.response.data.detail ? error.response.data.message : error.message,
      });
    }
  };
};
