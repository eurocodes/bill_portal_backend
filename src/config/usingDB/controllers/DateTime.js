exports.generateDateTime = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const dateTime = `${date} at ${time}`;
    return dateTime;
}