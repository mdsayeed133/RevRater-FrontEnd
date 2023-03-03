class FollowRequest {
    constructor(userId, employeeId) {
        this.userId = userId;
        this.employeeId = employeeId;
    }

    getUserId() {
        return this.userId;
    }

    setUserId(userId) {
        this.userId = userId;
    }

    getEmployeeId() {
        return this.employeeId;
    }

    setEmployeeId(employeeId) {
        this.employeeId = employeeId;
    }
}

export default FollowRequest;