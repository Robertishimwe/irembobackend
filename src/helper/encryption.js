import bcrypt from 'bcryptjs';

class Protection {
    static checkPassword(password, hashed) {
        return bcrypt.compare(password, hashed);
    }

    static hashPassword(password) {
        return bcrypt.hash(password, 10);
    }
}

export default Protection;