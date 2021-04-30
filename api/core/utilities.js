const convertToDateObject = (SRTimeString) => {
    return new Date(
      parseInt(SRTimeString.replace(/[\/\(\)date]/gi, ""))
    ).toLocaleString();
  };

  const checkPassword = (password) => {
    return password.includes(password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/));
  };

  const checkEmail = (email) => {
    return email.includes(email.match(/^[\w\d\.\-]+\@[\w\d]+\.[\w\d]+$/));
  };
  
  
  module.exports = {
    convertToDateObject,
    checkPassword,
    checkEmail
  };