import slugify from 'slugify';
import { v4 as uuidv4 } from 'uuid';
import {
  CampaignRuleCreateDto,
  CreateCampaignDto,
} from '../../dtos/campaign/create-campaign.dto';
import { Campaign } from '../../entities/campaign.entity';
import { CampaignRule } from '../../entities/campaign-rule.entity';
import { CampaignRepository } from '../../repositiries';
import { ApiError } from '../../utils/api-error';

export async function createCampaignService(data: CreateCampaignDto) {
  const { name, startDate, endDate, isActive, rules } = data;

  const isCampaignExists = await CampaignRepository.exists({ where: { name } });

  if (isCampaignExists) {
    throw new ApiError(409, 'Campaign with this name already exists');
  }

  let baseSlug = slugify(name, { lower: true, strict: true });
  const randomSuffix = uuidv4().split('-')[0];
  const slug = `${baseSlug}-${randomSuffix}`;

  const campaign = new Campaign();
  campaign.name = name;
  campaign.startDate = startDate;
  campaign.endDate = endDate;
  campaign.isActive = isActive;
  campaign.slug = slug;

  const campaignRules = rules.map((ruleDto: CampaignRuleCreateDto) => {
    const rule = new CampaignRule();
    rule.minAge = ruleDto.minAge;
    rule.maxAge = ruleDto.maxAge;
    rule.points = ruleDto.points;
    return rule;
  });

  campaign.rules = campaignRules;

  const savedCampaign = await CampaignRepository.save(campaign);

  return savedCampaign;
}
