export const permissionSlugs = {
  VIEW_CAMPAIGN: 'view:campaign',
  CREATE_CAMPAIGN: 'create:campaign',
  UPDATE_CAMPAIGN: 'update:campaign',
  DELETE_CAMPAIGN: 'delete:campaign',
  VIEW_PROFILE: 'view:profile',
  UPDATE_PROFILE: 'update:profile',
  DELETE_PROFILE: 'delete:profile',
  VIEW_ALL_PROFILE: 'view_all:profile',
  RESEND_EMAIL_REFERRAL: 'resend_email:referral',
  CHECK_USER_STATUS: 'view:user_membershipStatus',
  CREATE_REWARD_PROVIDER: 'create:reward_provider',
  VIEW_REWARD_PROVIDER: 'view:reward_provider',
  UPDATE_REWARD_PROVIDER: 'update:reward_provider',
  DELETE_REWARD_PROVIDER: 'delete:reward_provider',
  CREATE_REWARD: 'create:reward',
  DELETE_REWARD: 'delete:reward',
  UPDATE_REWARD: 'update:reward',
};

export const PERMISSIONS_DATA = [
  { action: 'view', resource: 'campaign', slug: permissionSlugs.VIEW_CAMPAIGN },
  {
    action: 'create',
    resource: 'campaign',
    slug: permissionSlugs.CREATE_CAMPAIGN,
  },
  {
    action: 'update',
    resource: 'campaign',
    slug: permissionSlugs.UPDATE_CAMPAIGN,
  },
  {
    action: 'delete',
    resource: 'campaign',
    slug: permissionSlugs.DELETE_CAMPAIGN,
  },
  { action: 'view', resource: 'reward', slug: 'view:reward' },
  { action: 'create', resource: 'reward', slug: 'create:reward' },
  { action: 'update', resource: 'reward', slug: 'update:reward' },
  { action: 'delete', resource: 'reward', slug: 'delete:reward' },
  { action: 'view', resource: 'profile', slug: permissionSlugs.VIEW_PROFILE },
  {
    action: 'update',
    resource: 'profile',
    slug: permissionSlugs.UPDATE_PROFILE,
  },
  {
    action: 'delete',
    resource: 'profile',
    slug: permissionSlugs.DELETE_PROFILE,
  },
  {
    action: 'view_all',
    resource: 'profile',
    slug: permissionSlugs.VIEW_ALL_PROFILE,
  },
];
