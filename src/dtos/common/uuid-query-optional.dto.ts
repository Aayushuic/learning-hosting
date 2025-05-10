import { IsOptional, IsUUID } from 'class-validator';

export class OptionalUserUUIDQueryDto {
  @IsUUID()
  @IsOptional()
  userId: string;
}
