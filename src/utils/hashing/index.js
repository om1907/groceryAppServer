import bcrypt from 'bcrypt';

const hashPassword = async (password) =>{
    const hashedPassword = await bcrypt.hash(password, process.env.SALT);
    return hashedPassword;
}

const comparePassword = async (password, hashedPassword) => {
    console.log("Comparing passwords", password, hashedPassword);
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

export { hashPassword, comparePassword };