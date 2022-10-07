export const formatDateTime = (dateStr) => {
  let date = new Date(dateStr);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return (
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    "  " +
    strTime
  );
};

export const formatDateString = (date) => {
  let d = new Date(date).toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return d;
};
