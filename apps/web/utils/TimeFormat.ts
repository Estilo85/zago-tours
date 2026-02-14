export const formatTime = (dateTime: string | Date | null | undefined) => {
  if (!dateTime) return 'N/A';

  const dateObj = typeof dateTime === 'string' ? new Date(dateTime) : dateTime;

  if (isNaN(dateObj.getTime())) return 'Invalid Time';

  return dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
