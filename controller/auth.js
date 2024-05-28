import { Admin } from "../models/admin.js";
import { default as bcrypt } from "bcryptjs";
import { default as jwt } from "jsonwebtoken";

export const SECRET = "this is a secret key";

const postAdminLogin = (req, res, next) => {
  const userId = req.query.userId;
  const password = req.query.password;

  // console.log(req.query);

  if (!userId || !password) {
    return res.status(400).json({
      status: 400,
      message: "Some fields are missing",
      success: false,
    });
  }

  //user login checks student first
  Admin.findOne({ user_id: userId })
    .then((result) => {
      if (!result) {
        return 0;
      }

      return result;
    })
    .then(async (response) => {
      if (response === 0) {
        return res.status(404).json({
          status: 404,
          message: "User not found",
          success: false,
        });
      }

      const pwdCompare = await bcrypt.compare(password, response.password);
      if (!pwdCompare) {
        return res.status(401).json({
          status: 401,
          message: "Wrong Password",
          success: false,
        });
      }

      const token = jwt.sign(
        {
          adminId: response._id.toString(),
          adminUserID: response.user_id,
        },
        SECRET,
        {
          expiresIn: "12h",
        }
      );

      res.cookie("jwtToken", token, {
        httpOnly: true,
        maxAge: 43200000,
        path: "/",
      });

      return res.status(200).json({
        status: 200,
        message: "Login Successful",
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        success: false,
      });
    });
};

const postCreateAdmin = (req, res, next) => {
  const userId = req.query.userId;
  const password = req.query.password;

  if (!userId || !password) {
    return res.status(400).json({
      status: 400,
      message: "Missing fields",
      success: false,
    });
  }

  bcrypt.hash(password, 12, (err, hash) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: 500,
        message: "Internal Server Error",
        success: false,
      });
    }

    const admin = new Admin({
      user_id: userId,
      password: hash,
    });

    admin
      .save()
      .then((response) => {
        return res.status(201).json({
          status: 201,
          message: "Admin created",
          success: true,
          value: response,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.redirect("/admin/home");
      });
  });
};

const getAdminLogout = (req, res, next) => {
  try {
    res.clearCookie("jwtToken");
    return res.status(200).json({
      status: 200,
      message: "Logged out Successful!",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Failed to Log out",
      success: false,
    });
  }
};

export { postAdminLogin, postCreateAdmin, getAdminLogout };
