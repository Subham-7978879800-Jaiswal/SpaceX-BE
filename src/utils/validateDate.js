function validateDateString(dateString) {
  // Check if string matches the format YYYY-MM-DD using regular expression
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return false;
  }

  // Parse the date and check if it is a valid date
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return false;
  }

  // Check if the year and month components are within valid ranges
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-11, so add 1 to get 1-12

  if (year < 1800 || year > 3000 || month < 1 || month > 12) {
    return false;
  }

  // Check if the day component is within a valid range for the given month and year
  const day = date.getDate();

  // Check for February
  if (month === 2) {
    // Leap year check (divisible by 4 but not by 100, or divisible by 400)
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

    if (isLeapYear && (day < 1 || day > 29)) {
      return false;
    } else if (!isLeapYear && (day < 1 || day > 28)) {
      return false;
    }
  }

  // Check for months with 30 days
  if ([4, 6, 9, 11].includes(month) && (day < 1 || day > 30)) {
    return false;
  }

  // Check for months with 31 days
  if ([1, 3, 5, 7, 8, 10, 12].includes(month) && (day < 1 || day > 31)) {
    return false;
  }

  // All checks passed, return true
  return true;
}

const validateDate = (date) => {
  const formattedDate = date.trim();
  let isValidDate = true;
  let message = "";

  // Date is expected as YYYY-MM-DD
  if (!validateDateString(formattedDate)) {
    message =
      "Expected date format is YYYY-MM-DD and the Date should be valid as well";
    isValidDate = false;
  }

  return { isValidDate, message };
};

module.exports = { validateDate };
