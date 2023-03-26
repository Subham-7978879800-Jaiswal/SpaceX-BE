const validateLaunchDataAvailability = (launchData) => {
  const requiredFields = ["mission", "rocket", "launchDate", "target"];

  for (let i = 0; i < requiredFields.length; i++) {
    if (!launchData[requiredFields[i]]) {
      return { isValidLaunchData: false, fieldMissing: requiredFields[i] };
    }
  }

  return { isValidLaunchData: true, fieldMissing: null };
};

module.exports = { validateLaunchDataAvailability };
