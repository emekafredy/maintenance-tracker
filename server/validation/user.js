import validator from 'validator';


class SignupValidation {
  static UserSignup(request, response, next) {
    const {
      firstName, lastName, email, password,
    } = request.body;
    let isValid = true; const errors = {};

    if (!firstName) {
      isValid = false;
      errors.firstName = 'First name is required';
    }
    if (!lastName) {
      isValid = false;
      errors.lastName = 'Last name is required';
    }
    if (!email) {
      isValid = false;
      errors.email = 'Your email is required';
    }
    if (!password) {
      isValid = false;
      errors.password = 'Your password is required';
    }
    if (isValid) {
      return next();
    }
    return response.status(400).json({
      success: false,
      errors,
    });
  }

  static validateInput(request, response, next) {
    const { email } = request.body;
    let isValid = true;
    const errors = {};

    if (email && !validator.isEmail(email)) {
      isValid = false;
      errors.email = 'Your email is invalid';
    }
    if (isValid) {
      return next();
    }
    return response.status(400).json({
      success: false,
      errors,
    });
  }

  static checkLength(request, response, next) {
    const { password, firstName, lastName } = request.body;
    let isValid = true;
    const errors = {};

    if (lastName && !(validator.isLength(lastName, { min: 3, max: 10 }))) {
      isValid = false;
      errors.lastName = 'The length of your last name should be between 1 and 10';
    }
    if (firstName && !(validator.isLength(firstName, { min: 3, max: 10 }))) {
      isValid = false;
      errors.firstName = 'The length of your first name should be between 1 and 10';
    }
    if (password && !(validator.isLength(password, { min: 6, max: 15 }))) {
      isValid = false;
      errors.password = 'your Password length should be between 6 and 15';
    }
    if (isValid) {
      return next();
    }
    return response.status(400).json({
      success: false,
      errors,
    });
  }

  static checkUserLogin(request, response, next) {
    const { email, password } = request.body;
    let isValid = true;
    const errors = {};

    if (!email) {
      isValid = false;
      errors.email = 'Your email is required';
    }
    if (!password) {
      isValid = false;
      errors.password = 'Your password is required';
    }
    if (isValid) {
      return next();
    }
    return response.status(400).json({
      success: false,
      errors,
    });
  }
}

export default SignupValidation;
