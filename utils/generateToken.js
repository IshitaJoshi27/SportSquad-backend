import jwt from "jsonwebtoken";


const generateToken = (id, res) => {
    const token = jwt.sign(
        {id}, 
        process.env.JWT_SEC,
        {expiresIn: "10d"}
    );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 10*24*60*60*1000,
            sameSite: "strict",
        })

};

export default generateToken;