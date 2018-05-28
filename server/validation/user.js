import checkUserDetails from '../utils/checkUserSignup';
import checkLogin from '../utils/checkUserLogin';

class UserValidation {
  static checkUser(request, response) {
    const {
      firstName, lastName, email, password,
    } = request.body;

    checkUserDetails.checkUserSignup(response, firstName, 'first name');
    checkUserDetails.checkUserSignup(response, lastName, 'last name');
    checkUserDetails.checkUserSignup(response, password, 'password');
    checkUserDetails.checkUserSignupMail(response, email, 'email');

    return null;
  }

  static checkUserLogin(request, response) {
    const { email, password } = request.body;

    checkLogin(response, email, password, 'email', 'password');

    return null;
  }
}

export default UserValidation;
