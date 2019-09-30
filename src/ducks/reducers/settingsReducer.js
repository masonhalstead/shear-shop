import {
  SET_ERROR_MESSAGE,
  SET_LOADING,
  SET_PROJECT,
  SHOW_ALERT,
  TOGGLE_MODAL,
  SET_CURRENT_JOB,
  SET_CURRENT_JOBS,
  SET_CURRENT_DEFINITIONS
} from 'ducks/types';
import uuid from 'uuid';

const settingsState = {
  error_message: '',
  loading: false,
  alert: false,
  project: {},
  job: {},
  modals: {
    project: false,
    definitions: false,
  },
  jobs: {
    columns: [],
    search_string: '',
    headers: [
      {
        title: 'Job',
        show: true,
        flex_grow: 1,
        min_width: '100px',
        sort: 'default',
        sort_key: 'job_definition_name',
        uuid: uuid.v1(),
      },
      {
        title: 'State',
        show: true,
        min_width: '125px',
        uuid: uuid.v1(),
      },
      {
        title: 'Duration',
        show: true,
        min_width: '125px',
        sort: false,
        uuid: uuid.v1(),
      },
      {
        title: 'Requirements',
        show: true,
        min_width: '150px',
        sort: false,
        uuid: uuid.v1(),
      },
      {
        title: 'Created By',
        show: true,
        min_width: '125px',
        sort: false,
        uuid: uuid.v1(),
      },
      {
        title: 'Created',
        show: true,
        min_width: '125px',
        sort: false,
        uuid: uuid.v1(),
      },
      {
        title: '',
        show: true,
        min_width: '40px',
        sort: false,
        uuid: uuid.v1(),
      },
      {
        title: '',
        show: true,
        min_width: '40px',
        sort: false,
        uuid: uuid.v1(),
      },
    ],
    settings: {
      search_key: 'job_definition_name',
      row_height: 32,
    },
  },
  definitions: {
    columns: [],
    search_string: '',
    headers: [
      {
        title: 'Job',
        show: true,
        flex_grow: 1,
        min_width: '100px',
        sort: 'default',
        sort_key: 'job_definition_name',
        uuid: uuid.v1(),
      },
      {
        title: 'Requirements',
        show: true,
        min_width: '175px',
        uuid: uuid.v1(),
      },
      {
        title: 'Location',
        show: true,
        min_width: '175px',
        sort: 'default',
        sort_key: 'location_name',
        uuid: uuid.v1(),
      },
      {
        title: 'Timeout',
        show: true,
        min_width: '125px',
        sort: 'default',
        sort_key: 'timeout_seconds',
        uuid: uuid.v1(),
      },
      {
        title: 'Method',
        show: true,
        min_width: '125px',
        sort: false,
        uuid: uuid.v1(),
      },
      {
        title: 'Created By',
        show: true,
        min_width: '125px',
        sort: false,
        uuid: uuid.v1(),
      },
      {
        title: 'Created',
        show: true,
        min_width: '125px',
        sort: false,
        uuid: uuid.v1(),
      },
      {
        title: '',
        show: true,
        min_width: '40px',
        sort: false,
        uuid: uuid.v1(),
      },
    ],
    settings: {
      search_key: 'job_definition_name',
      row_height: 33,
    },
  }
};
export const settingsReducer = (state = settingsState, action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return { ...state, error_message: action.payload };
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case TOGGLE_MODAL:
      return { ...state, modals: { ...state.modals, ...action.payload } };
    case SHOW_ALERT:
      return {
        ...state,
        alert: action.payload,
      };
    case SET_PROJECT:
      return { ...state, project: action.payload };
    case SET_CURRENT_JOB:
      return { ...state, job: action.payload };
    case SET_CURRENT_JOBS:
      return { ...state, jobs: { ...state.jobs, ...action.payload } };
      case SET_CURRENT_DEFINITIONS:
      return { ...state, definitions: { ...state.definitions, ...action.payload } };
    default:
      return state;
  }
};
