import { Request, Response } from 'express';
import {
  createPanelListService,
  getPanelVariablesService,
  logOnUserService,
  updatePanelistVariableService,
} from '../../services/forsta/forsta.service';

export const logOnUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required.',
    });
  }

  try {
    const result = await logOnUserService(username, password);
    return res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('LogOnUser failed:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

export const createPanelist = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { panelProjectId, fieldNames, fieldValues } = req.body;
  try {
    const result = await createPanelListService({
      panelProjectId,
      fieldNames,
      fieldValues,
    });
    return res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('CreatePanelist failed:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

export const getPanelVariables = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { panelProjectId, fieldNames, userId } = req.body;
  try {
    const result = await getPanelVariablesService({
      panelProjectId,
      userId: Number(userId),
      fieldNames,
    });
    return res.json({ success: true, data: result });
  } catch (error: any) {
    console.error('CreatePanelist failed:', error);
    return res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
    });
  }
};

// export const updatePanelistVariable = async (
//   req: Request,
//   res: Response
// ): Promise<any> => {
//   const { panelProjectId, fieldNames, userId } = req.body;
//   const result = await updatePanelistVariableService({
//     panelProjectId,
//     userId: Number(userId),
//     fieldNames,
//     fieldValues,
//   });
//   return res.json({ success: true, data: result });
// };
