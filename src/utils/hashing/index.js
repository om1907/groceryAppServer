import bcrypt from 'bcrypt';
import { SALT } from '../constants.js';

const hashPassword = async (password) =>{
    const hashedPassword = await bcrypt.hash(password, SALT);
    return hashedPassword;
}

const comparePassword = async (password, hashedPassword) => {
    console.log("Comparing passwords", password, hashedPassword);
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

export { hashPassword, comparePassword };