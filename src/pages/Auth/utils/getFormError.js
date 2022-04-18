export const getFormError = (formValues) => {
    const { email, password, firstName, lastName, confirmPassword } = formValues;
    const errors = {};
  
    const testEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  
    if (email === "" || !testEmail) {
      errors.email = "Invalid Email";
    }
  
    if (password === "") {
      errors.password = "Enter Password";
    } else if (password.length < 8) {
      errors.password = "Password must be 8 character long";
    }
  
    if (firstName === "") {
      errors.firstName = "Enter First Name";
    }
  
    if (lastName === "") {
      errors.lastName = "Enter Last Name";
    }
  
    if (confirmPassword === undefined) {
      return errors;
    } else if (confirmPassword === "") {
      errors.confirmPassword = "Enter Password Again";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "Password doesn't match";
    }
  
    return errors;
  };