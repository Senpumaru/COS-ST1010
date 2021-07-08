import {
  CASE_CREATE_REQUEST,
  CASE_CREATE_SUCCESS,
  CASE_CREATE_FAIL,
  CASE_CREATE_RESET,
  CASE_UPDATE_REQUEST,
  CASE_UPDATE_SUCCESS,
  CASE_UPDATE_FAIL,
  CASE_UPDATE_RESET,
  CASE_DETAILS_REQUEST,
  CASE_DETAILS_SUCCESS,
  CASE_DETAILS_FAIL,
  CASE_DETAILS_RESET,
  CASE_TRANSFER_REQUEST,
  CASE_TRANSFER_SUCCESS,
  CASE_TRANSFER_FAIL,
  APPROVAL_UPDATE_FAIL,
  APPROVAL_UPDATE_REQUEST,
  APPROVAL_UPDATE_SUCCESS,
  CASE_DELETE_REQUEST,
  CASE_DELETE_SUCCESS,
  CASE_DELETE_FAIL,
  CASE_LIST_REQUEST,
  CASE_LIST_SUCCESS,
  CASE_LIST_FAIL,
  CASE_STATISTICS_REQUEST,
  CASE_STATISTICS_SUCCESS,
  CASE_STATISTICS_FAIL,
} from "../../constants/Cases/CaseConstants";
import { createAction, createReducer } from "@reduxjs/toolkit";

const initialCaseCreateState = {};

export const caseCreateReducer = createReducer(
  initialCaseCreateState,
  (builder) => {
    builder
      .addCase(CASE_CREATE_REQUEST, (state, action) => {
        state.loadingCreate = true;
        state.successCreate = false;
        state.errorCreate = false;
      })
      .addCase(CASE_CREATE_SUCCESS, (state, action) => {
        state.loadingCreate = false;
        state.successCreate = true;
        state.instance = action.payload;
      })
      .addCase(CASE_CREATE_FAIL, (state, action) => {
        state.loadingCreate = false;
        state.successCreate = false;
        state.errorCreate = action.payload;
      })
      .addDefaultCase((state, action) => {
        state = {};
      });
  }
);

export const caseDetailsReducer = (state = { instance: {} }, action) => {
  switch (action.type) {
    case CASE_DETAILS_REQUEST:
      return { ...state, loadingDetails: true };

    case CASE_DETAILS_SUCCESS:
      return { loadingDetails: false, instance: action.payload };

    case CASE_DETAILS_FAIL:
      return { loadingDetails: false, errorDetails: action.payload };

    case CASE_DETAILS_RESET:
      return {};

    default:
      return state;
  }
};

export const caseUpdateReducer = (state = { instance: {} }, action) => {
  switch (action.type) {
    case CASE_UPDATE_REQUEST:
      return { loadingUpdate: true };

    case CASE_UPDATE_SUCCESS:
      return {
        loadingUpdate: false,
        successUpdate: true,
        instance: action.payload,
      };

    case CASE_UPDATE_FAIL:
      return {
        loadingUpdate: false,
        errorUpdate: action.payload,
      };

    case CASE_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

export const caseTransferReducer = (state = {}, action) => {
  switch (action.type) {
    case CASE_TRANSFER_REQUEST:
      return { loadingTransfer: true };

    case CASE_TRANSFER_SUCCESS:
      return {
        loadingTransfer: false,
        successTransfer: true,
      };

    case CASE_TRANSFER_FAIL:
      return {
        loadingTransfer: false,
        errorTransfer: action.payload,
      };

    default:
      return state;
  }
};

export const approvalUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPROVAL_UPDATE_REQUEST:
      return { loadingApproval: true };

    case APPROVAL_UPDATE_SUCCESS:
      return {
        loadingApproval: false,
        successApproval: true,
      };

    case APPROVAL_UPDATE_FAIL:
      return {
        loadingApproval: false,
        errorApproval: action.payload,
      };

    default:
      return state;
  }
};

export const caseDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CASE_DELETE_REQUEST:
      return { loadingDelete: true };

    case CASE_DELETE_SUCCESS:
      return { loadingDelete: false, successDelete: true };

    case CASE_DELETE_FAIL:
      return { loadingDelete: false, error: action.payload };

    default:
      return state;
  }
};

// Initial State
const initialState = { cases: [] };

export const caseListReducer = (state = initialState, action) => {
  switch (action.type) {
    case CASE_LIST_REQUEST:
      return {
        cases: state.cases,
        loading: true,
      };

    case CASE_LIST_SUCCESS:
      return {
        cases: action.payload,
        loading: false,
      };

    case CASE_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// Initial State
export const caseStatisticsReducer = (state = {}, action) => {
  switch (action.type) {
    case CASE_STATISTICS_REQUEST:
      return {
        caseStats: {
          cases_count: state.cases_count,
        },
        loadingStats: false,
      };

    case CASE_STATISTICS_SUCCESS:
      return { loadingStats: false, caseStats: action.payload };

    case CASE_STATISTICS_FAIL:
      return { loadingStats: false, errorStats: action.payload };

    default:
      return state;
  }
};
