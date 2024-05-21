import jwt from 'jsonwebtoken'


export const shouldBeLoggedIn=  async (req, res) => {
    console.log(req.userId);

    res.status(200).json({messeage : "You are Authenticated"})
}
export const shouldbeAdmin =  async (req,) => {
    const token = req.cookies.token

    if(!token) return res.status(401).json(({messeage : " Not Authenticated"}));

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if(err) return res.status(403).json(({messeage : " Token is not Valied"}));
        if(!payload.isAdmin){
            return res.status(403).json(({messeage : " Not Authorised !"}))
        }
    })

    res.status(200).json({messeage : "You are Authenticated"})
}