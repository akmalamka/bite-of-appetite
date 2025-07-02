import { getLocalTimeZone, parseDate } from '@internationalized/date';
import { useDateFormatter as radixDateFormatter } from 'radix-vue';

export function useDateFormatter(locales = 'en-US') {
  const radixFormatter = radixDateFormatter(locales);

  // formatDate used to format ISO 8601 date value ex. 2024-02-12
  function formatDate(date: string, options: Intl.DateTimeFormatOptions = {}) {
    try {
      const parsedDate = parseDate(date).toDate(getLocalTimeZone());

      return radixFormatter.custom(parsedDate, options);
    } catch {
      // Return empty string if date is not a valid ISO date string
      return '';
    }
  }

  return {
    formatDate,
  };
}
