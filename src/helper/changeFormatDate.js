function changeFormatDateStatusThread(date) {
  const getDateNow = new Date();
  const dateCreatedThread = new Date(date);

  const diffTime = Math.abs(dateCreatedThread - getDateNow);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays > 0) {
    return `${diffDays} hari lalu`;
  }
  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const hours = Math.floor(diffMinutes / 60);
  if (hours > 0) {
    return `${diffDays}  hari lalu`;
  } else {
    return `${diffMinutes} menit lalu`;
  }
}
export {
  changeFormatDateStatusThread
};
