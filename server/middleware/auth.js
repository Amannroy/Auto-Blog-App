import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const token = req.headers.authorization; // Wee are providing the token in the token headers in the authorization property

    try{
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    }catch(error){
        res.json({success: false, message: "Invalid Token"});
    }
}

export default auth;