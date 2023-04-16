function removePassword(userObject) {
    const { password, ...others } = userObject;
    return others;
}

module.exports = {
    removePassword
}

