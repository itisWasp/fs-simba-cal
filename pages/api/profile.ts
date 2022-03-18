import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

const Profile: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const token: any = req.headers["auth-token"];
  const config: any = process.env.JWT_TOKEN_SECRET;
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified: any = jwt.verify(token, config);

    let profile = await prisma.user.findUnique({
      where: { id: verified.user.id },
    });

    if (!profile) {
      return res.status(404).json({
        message: "No profile found",
      });
    }

    return res.status(200).json({
      FirstName: verified.user.FirstName,
      LastName: verified.user.LastName,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export default Profile;
