class PasswordResetRequest {
    constructor(userId, password) {
        this.userId = userId;
        this.password = password;
    }

    getUserId() {
        return this.userId;
    }

    setUserId(userId) {
        this.userId = userId;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
    }
}

export default PasswordResetRequest;