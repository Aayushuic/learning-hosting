import {
  FORSTA_API_URLS,
  FORSTA_METHODS,
} from '../../constants/forsta.constants';
import { callSoapMethod } from '../soap/soap.service';
import {
  CreatePanelistResponse,
  GetPanelVariablesResponse,
  LogOnUserResponse,
} from './types';

const baseUrl = process.env.FORSTA_API_BASE_URL;

export const logOnUserService = async (
  username: string,
  password: string
): Promise<LogOnUserResponse> => {
  const wsdlUrl = `${baseUrl}${FORSTA_API_URLS.LOG_ON_USER}`;
  return await callSoapMethod(wsdlUrl, FORSTA_METHODS.LOG_ON_USER, {
    username,
    password,
  });
};

export const createPanelListService = async (data: {
  panelProjectId: string;
  fieldNames: {
    string: string[];
  };
  fieldValues: {
    string: string[];
  };
}): Promise<CreatePanelistResponse> => {
  const key = await getAccessKey();
  if (!key) throw new Error('LogOnUser failed. Key not found.');

  const wsdlUrl = `${baseUrl}${FORSTA_API_URLS.COMMUNITY_PANEL}`;
  return await callSoapMethod(wsdlUrl, FORSTA_METHODS.CREATE_PANEL_LIST, {
    key,
    ...data,
  });
};

export const getPanelVariablesService = async (data: {
  panelProjectId: string;
  userId: Number;
  fieldNames: {
    string: string[];
  };
}): Promise<GetPanelVariablesResponse> => {
  const key = await getAccessKey();
  if (!key) throw new Error('LogOnUser failed. Key not found.');

  const wsdlUrl = `${baseUrl}${FORSTA_API_URLS.COMMUNITY_PANEL}`;
  return await callSoapMethod(wsdlUrl, FORSTA_METHODS.GET_PANEL_VARIABLES, {
    key,
    ...data,
  });
};

export const updatePanelistVariableService = async (data: {
  panelProjectId: string;
  userId: number;
  fieldNames: { string: string[] };
  fieldValues: {
    string: string[];
  };
}) => {
  const key = await getAccessKey();
  if (!key) throw new Error('LogOnUser failed. Key not found.');
  const wsdlUrl = `${baseUrl}${FORSTA_API_URLS.COMMUNITY_PANEL}`;
  return await callSoapMethod(wsdlUrl, FORSTA_METHODS.UPDATE_PANEL_VARIABLES, {
    key,
    ...data,
  });
};

export const deletePanelistService = async (data: {
  projectId: string;
  panelistId: number;
}) => {
  const key = await getAccessKey();
  if (!key) throw new Error('LogOnUser failed. Key not found.');
  const wsdlUrl = `${baseUrl}${FORSTA_API_URLS.COMMUNITY_PANEL}`;
  return await callSoapMethod(wsdlUrl, FORSTA_METHODS.DELETE_PANEL_LIST, {
    key,
    ...data,
  });
};

export const getUpdateProfileSurveyUrl = async (data: {
  panelId: string;
  panelistId: number;
  language: string;
  updateProfileProjectid: string;
  returnUrl: string;
}) => {
  const key = await getAccessKey();
  console.log(key);
  if (!key) throw new Error('LogOnUser failed. Key not found.');
  const wsdlUrl = `${baseUrl}${FORSTA_API_URLS.COMMUNITY_PANEL}`;
  return await callSoapMethod(
    wsdlUrl,
    FORSTA_METHODS.GET_UPDATE_PROFILE_SURVEYURL,
    {
      key,
      ...data,
    }
  );
};

export const getAccessKey = async (): Promise<any> => {
  const loginResponse = await logOnUserService(
    process.env.FORSTA_API_USERNAME as string,
    process.env.FORSTA_API_PASSWORD as string
  );
  return loginResponse?.LogOnUserResult;
};
