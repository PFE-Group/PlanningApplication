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

exports.checkPwd = (pwd) => {

};

exports.checkEmail = (email) => {

};
