export function parseStringToDate(dateString: string | undefined): Date | null {
  if (!dateString) {
    return null;
  }

  // Пример: "Fri Dec 08 2023 00:00:00 GMT+0300 (Москва, стандартное время)"
  const parsedDate = new Date(dateString);

  // Проверка на валидность даты
  if (isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}
