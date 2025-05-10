import { Request, Response } from 'express';
import { myAccountLifeStyleSurveyService } from '../../services/survey/myaccount-lifestyle-survey.service';

export const myAccountLifeStyleSurveyController = async (
  req: Request,
  res: Response
): Promise<any> => {
  // const { surveyId=1, surveyPoint=0 } = req.body;
  const { email } = (req as any).user;

  const data = await myAccountLifeStyleSurveyService(email);

  return res.status(200).json({ success: true, data });
};
