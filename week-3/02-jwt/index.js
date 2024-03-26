const jwt = require('jsonwebtoken');
const jwtPassword = 'secret';
const z = require("zod");

const emailShema = z.string().email();
const PasswodSchema = z.string().min(6);

function signJwt(username, password) {
    // Your code here

    const email = emailShema.safeParse(username);
    const pass = PasswodSchema.safeParse(password);

    if(!email.success || !pass.success) {
        return null;
    }
    const signature = jwt.sign({username},jwtPassword);
    return signature;
}

/**
 * Verifies a JWT using a secret key.
 *
 * @param {string} token - The JWT string to verify.
 * @returns {boolean} Returns true if the token is valid and verified using the secret key.
 *                    Returns false if the token is invalid, expired, or not verified
 *                    using the secret key.
 */
function verifyJwt(token) {
    // Your code here

    try{
        const verify = jwt.verify(token, jwtPassword);
        return true;
    }
    catch{
        return false;
    }
}

/**
 * Decodes a JWT to reveal its payload without verifying its authenticity.
 *
 * @param {string} token - The JWT string to decode.
 * @returns {object|false} The decoded payload of the JWT if the token is a valid JWT format.
 *                         Returns false if the token is not a valid JWT format.
 */
function decodeJwt(token) {
    // Your code here

    const decoded = jwt.decode(token);
    if(decoded) {
        return true;
    }

    return false;
}


module.exports = {
  signJwt,
  verifyJwt,
  decodeJwt,
  jwtPassword,
};
