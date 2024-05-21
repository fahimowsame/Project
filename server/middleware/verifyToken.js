import jwt from 'jsonwebtoken'


export const verifyToken = (req, res, next) => {
    const token = req.cookies.token

    if(!token) return res.status(401).json(({messeage : " Not Authenticated"}));

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if(err) return res.status(403).json(({messeage : " Token is not Valied"}));
        req.userId = payload.id;

        next();
    })

    
}