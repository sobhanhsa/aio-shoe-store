import jwt from "jsonwebtoken";

const checkToken = (token:string):string => {
    const decoded : {id:string} = jwt.verify(token, process.env.SECRET as string) as any;
    if (!decoded) throw "invalid token";
    return decoded.id
}