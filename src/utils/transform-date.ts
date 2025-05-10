import { parse, isValid, formatISO } from 'date-fns';

export function transformDate(value: string): string {
  const formats = ['MM/dd/yyyy', 'yyyy-MM-dd', 'dd-MM-yyyy', 'dd/MM/yyyy'];

  for (const format of formats) {
    const parsedDate = parse(value, format, new Date());
    if (isValid(parsedDate)) {
      return formatISO(parsedDate);
    }
  }

  throw new Error(`Invalid date format: ${value}`);
}
