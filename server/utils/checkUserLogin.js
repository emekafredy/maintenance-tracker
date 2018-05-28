const checkLogin = (response, dataMail, dataPass, dataNameField, dataNamePass) => {
  if (!dataMail && dataPass) {
    return response.status(400).json({
      message: `Please enter your ${dataNameField} address`,
    });
  }
  if (dataMail && !dataPass) {
    return response.status(400).json({
      message: `Please enter your ${dataNamePass}`,
    });
  }
  if (!dataMail && !dataPass) {
    return response.status(400).json({
      message: `Please enter your ${dataNameField} address and ${dataNamePass}`,
    });
  }
  return null;
};

export default checkLogin;
