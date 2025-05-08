const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const newUser = await authService.registerUser(req.body);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    const message = err.message || "Server error";
    const status =
      message.includes("taken") || message.includes("required") ? 400 : 500;
    res.status(status).json({ message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await authService.loginUser(email, password);
    res.status(200).json({ user, token });
  } catch (err) {
    const status =
      err.message.includes("required") || err.message.includes("credentials")
        ? 400
        : err.message.includes("not found")
        ? 404
        : 500;
    res.status(status).json({ message: err.message });
  }
};

module.exports = { register, login };
