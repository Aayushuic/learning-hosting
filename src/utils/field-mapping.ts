import {
  Gender,
  Race,
  MaritalStatus,
  Citizenship,
} from '../entities/user-meta-data.entity';
import { ApiError } from '../utils/api-error';

export const mapFieldToCode = (
  field: string,
  value: string | undefined
): string => {
  const mappings: Record<string, Record<string, string>> = {
    gender: {
      [Gender.MALE]: '1',
      [Gender.FEMALE]: '2',
      [Gender.OTHERS]: '3',
    },
    race: {
      [Race.CHINESE]: '1',
      [Race.MALAY]: '2',
      [Race.INDIAN]: '3',
      [Race.EURASIAN]: '4',
      [Race.OTHERS]: '5',
    },
    maritalStatus: {
      [MaritalStatus.SINGLE]: '1',
      [MaritalStatus.SOONTOBEMARRIED]: '2',
      [MaritalStatus.MARRIED]: '3',
      [MaritalStatus.DIVORCED]: '4',
      [MaritalStatus.SEPARATED]: '5',
      [MaritalStatus.WIDOWED]: '6',
    },
    citizenship: {
      [Citizenship.PERMANENT_RESIDENT]: '2',
      [Citizenship.SINGAPORE_CITIZEN]: '1',
    },
  };

  if (!value) {
    throw new ApiError(
      400,
      `Value for field "${field}" is undefined or empty.`
    );
  }

  if (!mappings[field]) {
    throw new ApiError(
      400,
      `Field "${field}" is not a valid field for mapping.`
    );
  }

  const code = mappings[field][value];
  if (!code) {
    throw new ApiError(
      400,
      `Value "${value}" is not valid for field "${field}".`
    );
  }

  return code;
};
