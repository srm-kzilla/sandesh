export const getCurrentDateTime = () => {
  return Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    hour12: true,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(Date.now());
};