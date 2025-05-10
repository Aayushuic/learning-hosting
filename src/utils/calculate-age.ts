import { parseISO, differenceInYears, isValid } from 'date-fns';

export const calculateAge = (dateOfBirth: string | Date): number => {
  const birthDate =
    typeof dateOfBirth === 'string' ? parseISO(dateOfBirth) : dateOfBirth;

  if (!isValid(birthDate)) {
    throw new Error(
      'Invalid date provided. Please ensure the format is correct.'
    );
  }

  return differenceInYears(new Date(), birthDate);
};
