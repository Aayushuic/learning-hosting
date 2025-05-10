import {
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

class FieldNamesDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  string: string[];
}

class FieldValuesDto {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  string: string[];
}

export class CreatePanelistDto {
  @IsString()
  @IsNotEmpty()
  panelProjectId: string;

  @ValidateNested()
  @Type(() => FieldNamesDto)
  fieldNames: FieldNamesDto;

  @ValidateNested()
  @Type(() => FieldValuesDto)
  fieldValues: FieldValuesDto;
}
