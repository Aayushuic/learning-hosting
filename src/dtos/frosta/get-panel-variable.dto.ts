import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsNotEmpty,
  ArrayNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class FieldNamesDto {
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty({ each: true })
  @IsString({ each: true })
  string: string[];
}

export class GetPanelVariableDto {
  @IsString()
  panelProjectId: string;

  @IsNumber()
  userId: number;

  @ValidateNested()
  @Type(() => FieldNamesDto)
  fieldNames: FieldNamesDto;
}
