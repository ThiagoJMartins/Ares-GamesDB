const date = new Date();

const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();

const currenDate = `${year}-${month}-${day}`;

module.exports = currenDate;
