class UserRegisterDTO {
    constructor(email, password, username) {
        this.email = email;
        this.password = password;
        this.username = username;
    }
}

class UserLoginDTO {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

class UserResponseDTO {
    constructor(message, user) {
        this.message = message;
        this.user = user;
    }
}

class UserLoginResponseDTO {
    constructor(message, token, user) {
        this.message = message;
        this.token = token;
        this.user = user;
    }
}

module.exports = {
    UserRegisterDTO,
    UserLoginDTO,
    UserResponseDTO,
    UserLoginResponseDTO
};
