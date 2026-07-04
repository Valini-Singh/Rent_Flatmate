// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// export interface AuthRequest extends Request {
//   user?: {
//     id: string;
//     role: string;
//   };
// }

// export const auth = (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   const header = req.headers.authorization;

//   if (!header) {
//     return res.status(401).json({
//       message: "Token missing",
//     });
//   }

//   const token = header.split(" ")[1];

//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET as string
//     ) as {
//       id: string;
//       role: string;
//     };

//     req.user = decoded;

//     next();
//   } catch {
//     return res.status(401).json({
//       message: "Invalid Token",
//     });
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const auth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    console.log("Authorization Header:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("Token:", token);
    console.log("JWT Secret:", process.env.JWT_SECRET);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as {
      id: string;
      role: string;
    };

    console.log("Decoded:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("JWT Verify Error:", error);

    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};