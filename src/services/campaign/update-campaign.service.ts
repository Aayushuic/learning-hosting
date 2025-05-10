import {
  CampaignRuleCreateDto,
  CreateCampaignDto,
} from '../../dtos/campaign/create-campaign.dto';
import { CampaignRule } from '../../entities/campaign-rule.entity';

import { CampaignRepository, CampaignRuleRepository } from '../../repositiries';
import { ApiError } from '../../utils/api-error';

export const updateCampaignService = async ({
  id,
  updatedCampaign,
}: {
  id: string;
  updatedCampaign: CreateCampaignDto;
}) => {
  const { name, startDate, endDate, isActive, rules } = updatedCampaign;
  const existingCampaign = await CampaignRepository.findOne({
    where: { id },
    relations: ['rules'],
  });

  if (!existingCampaign) {
    throw new ApiError(404, 'campaign not found');
  }

  if (name !== undefined) existingCampaign.name = name;
  if (startDate !== undefined) existingCampaign.startDate = startDate;
  if (endDate !== undefined) existingCampaign.endDate = endDate;
  if (isActive !== undefined) existingCampaign.isActive = isActive;

  if (rules !== undefined) {
    const existingRuleIds = existingCampaign.rules.map((rule) => rule.id);
    const incomingRuleIds = rules
      .filter((rule: CampaignRuleCreateDto) => rule.id)
      .map((rule: CampaignRuleCreateDto) => rule.id);

    const rulesToDeleteIds = existingRuleIds.filter(
      (id) => !incomingRuleIds.includes(id)
    );

    if (rulesToDeleteIds.length > 0) {
      await CampaignRuleRepository.delete(rulesToDeleteIds);
    }

    const rulesToSave = rules.map((ruleData: CampaignRuleCreateDto) => {
      if (ruleData.id) {
        const existingRule = existingCampaign.rules.find(
          (r) => r.id === ruleData.id
        );
        if (existingRule) {
          existingRule.minAge = ruleData.minAge;
          existingRule.maxAge = ruleData.maxAge;
          existingRule.points = ruleData.points;
          return existingRule;
        }
      }

      const newRule = new CampaignRule();
      newRule.campaignId = existingCampaign.id;
      newRule.minAge = ruleData.minAge;
      newRule.maxAge = ruleData.maxAge;
      newRule.points = ruleData.points;
      return newRule;
    });

    const savedRules = await CampaignRuleRepository.save(rulesToSave);

    // Update the campaign's rules reference without circular dependency
    existingCampaign.rules = savedRules.map((rule: any) => {
      return {
        id: rule.id,
        minAge: rule.minAge,
        maxAge: rule.maxAge,
        points: rule.points,
        createdAt: rule.createdAt,
        updatedAt: rule.updatedAt,
        campaignId: rule.campaignId,
      } as CampaignRule;
    });
  }

  // Save the campaign
  await CampaignRepository.save(existingCampaign);

  // Return the updated campaign without circular references
  const responseCampaign = {
    ...existingCampaign,
    rules: existingCampaign.rules.map((rule) => ({
      id: rule.id,
      minAge: rule.minAge,
      maxAge: rule.maxAge,
      points: rule.points,
      createdAt: rule.createdAt,
      updatedAt: rule.updatedAt,
    })),
  };

  return responseCampaign;
};
