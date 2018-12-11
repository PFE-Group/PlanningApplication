exports.checkRole = (role) => {
    roles = ["invite", "membre"];
    return roles.includes(role);
};

exports.checkDate = (date) => {
    date = new Date(date).getTime();
    if(isNaN(date)) {
        return null;
    }
    return date;
};

exports.checkNumber = (n) => {
    if(isNaN(n)) return 0;
    return parseFloat(n);
};

exports.checkPwd = (pwd) => {

};

exports.checkEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

exports.checkString = (string) => {
    if(!string){
        return null;
    }
    return string;
};

/*
 * Source : https://stackoverflow.com/a/105074/9568751
 */
exports.generateUniqueId = () => {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + s4();
};