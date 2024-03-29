import crypto, { randomInt } from "crypto";
import speakeasy from "speakeasy";
import { SuccessResult } from "../result/SuccessResult.js";

export const sendTokenToCookie = (user, res) => {

    const { NODE_ENV, COOKIE_EXPIRES } = process.env;
    
    const jwt = user.generateJwt();

    return res
    .status(200)
    .cookie("jwt", jwt, {
        maxAge: COOKIE_EXPIRES,
        httpOnly: NODE_ENV === "development" ? true : false
    })
    .json(new SuccessResult());

}

export const generateRandomToken = (size) => {
    
    return crypto.randomBytes(size).toString("hex");
}

export const generateRandomInt = (digits) => {

    const minRange = 10 ** (digits - 1);
    const maxRange = 10 ** digits - 1;

    return Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
}

export const checkTwoFactorAuthCode = (code, secret) => {

    return speakeasy.totp.verify({
        token: code,
        secret: secret,
        encoding: "base32",
        window: 4
    });

}