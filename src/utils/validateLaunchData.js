const validateLaunchData = (launchData) => {
  const requiredFields = [
    "flightNumber",
    "mission",
    "rocket",
    "launchDate",
    "destination",
    "customer",
    "upcoming",
    "succcess",
  ];

  for (let i = 0; i < requiredFields.length; i++) {
    if (!launchData[requiredFields[i]]) {
      return { isValidLaunchData: false, fieldMissing: requiredFields[i] };
    }
  }

  return { isValidLaunchData: true, fieldMissing: null };
};

module.exports = { validateLaunchData };
