export function getTotalSeconds(date1, date2) {
  const diffInMs = Math.abs(date1 - date2);
  return Math.floor(diffInMs / 1000);
}
export function formatToMinutesSeconds(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}m ${seconds}s`;
}

export function getTimeSince(date) {
  const now = new Date();
  const diffMs = now - date;
  const oneDay = 1000 * 60 * 60 * 24;
  const oneMonth = oneDay * 30.44;
  const oneYear = oneDay * 365.25;

  const years = Math.floor(diffMs / oneYear);
  if (years >= 1) return `${years}y`;

  const months = Math.floor(diffMs / oneMonth);
  if (months >= 1) return `${months}m`;

  const days = Math.floor(diffMs / oneDay);
  return days === 0 ? "Today" : `${days}d`;
}

export function getTimeSinceMessage(date) {
  const now = new Date();
  const diffMs = now - date;
  const oneMinute = 1000 * 60;
  const oneHour = oneMinute * 60;

  if (hours >= 1) return `${hours}h`;
  const hours = Math.floor(diffMs / oneHour);
  if (hours >= 1) return `${hours}h`;

  const minutes = Math.floor(diffMs / oneMinute);
  return minutes <= 0 ? "Now" : `${minutes}m`;
}

function formatAMPM(date) {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return `${hours}:${minutes} ${ampm}`;
}

export function formatLastMessageTime(date) {
  const now = new Date();
  const diffMs = now - date;
  const oneDay = 1000 * 60 * 60 * 24;

  if (diffMs < oneDay && now.toDateString() !== date.toDateString()) {
    return formatAMPM(date);
  }

  if (diffMs < oneDay && now.toDateString() === date.toDateString()) {
    return formatAMPM(date);
  }

  return getTimeSince(date);
}
export function getTimeUntil(futureDate) {
  const now = new Date();
  const diffMs = futureDate - now;
  if (diffMs <= 0) return "0m 0s";

  const totalSeconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}m ${seconds}s`;
}
