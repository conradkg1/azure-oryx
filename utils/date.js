function formatDate(timestamp) {
    const dateObject = new Date(timestamp);
    const options = {
        weekday: "long",
        day: "numeric",
        year: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
    };
    return dateObject.toLocaleString("en-US", options);
}

module.exports = formatDate;