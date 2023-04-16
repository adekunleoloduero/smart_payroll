exports.removePassword = function(userObject) {
    const { password, ...others } = userObject;
    return others;
}


