export const hidetel = (mobile: string) => {
    var new_mobile = mobile.substr(0, 3) + '****' + mobile.substr(7)
    return new_mobile
}

export const hidemail = (email: string) => {
    if (String(email).indexOf('@') > 0) {
        var str = email.split('@'),
            _s = '';
        if (str[0].length > 3) {
            for (var i = 0; i < str[0].length - 3; i++) {
                _s += '*';
            }
        }
        var new_email = str[0].substr(0, 3) + _s + '@' + str[1]
        return new_email
    }
}