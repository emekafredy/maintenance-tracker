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
    return response.status(400).json(errors);
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
    return response.status(400).json(errors);
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
    return response.status(400).json(errors);
  }
}

export default SignupValidation;
