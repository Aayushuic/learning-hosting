import { IsBoolean } from 'class-validator';

export class changeNotificationSettingsDto {
  @IsBoolean()
  smsNotification: boolean;

  @IsBoolean()
  newsUpdateNotification: boolean;
}
