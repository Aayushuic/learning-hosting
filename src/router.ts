import express from 'express';
import isAuthenticated from './middlewares/authenticate';
import campaignRoute from './routes/admin/campaign.routes';
import AuthRouter from './routes/auth.routes';
import ForstaRouter from './routes/forsta/forsta.routes';
import RewardRouter from './routes/reward.routes';
import UserProfileRouter from './routes/user.routes';
import ReferralRouter from './routes/referral.routes';
import SurveyRouter from './routes/survey.routes';

const router = express.Router();

router.use('/admin/campaign', isAuthenticated, campaignRoute);
router.use('/auth', AuthRouter);
router.use('/forsta', ForstaRouter);
router.use('/rewards', isAuthenticated, RewardRouter);
router.use('/user', isAuthenticated, UserProfileRouter);
router.use('/referrals', isAuthenticated, ReferralRouter);
router.use('/surveys', isAuthenticated, SurveyRouter);

export default router;
