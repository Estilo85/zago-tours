export const formatTime = (time?: string) => {
  if (!time) return 'N/A';
  return new Date(`1970-01-01T${time}`).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
};
