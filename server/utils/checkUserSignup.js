import validator from 'validator';


class CheckUserDetails {
  static checkUserSignup(response, dataName, dataField) {
    if (!validator.trim(String(dataName)) || !(dataName)) {
      return response.status(400).json({
        message: `Your ${dataField} is required`,
      });
    }
    return null;
  }
  static checkUserSignupMail(response, dataName, dataField) {
    if (!dataName) {
      return response.status(400).json({
        message: `Your ${dataField} is required`,
      });
    }
    if (dataName && !validator.isEmail(dataName)) {
      return response.status(400).json({
        message: `Your ${dataField} is invalid`,
      });
    }
    return null;
  }
}

export default CheckUserDetails;
