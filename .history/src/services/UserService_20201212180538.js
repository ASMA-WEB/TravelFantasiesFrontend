import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";
class UserService extends GenericService {
  constructor() {
    super();
  }
  login = (email, password) =>
    new Promise((resolve, reject) => {
      this.post("users/login", { email, password })
        .then((token) => {
          localStorage.setItem("token", token);
          resolve(token);
        })
        .catch((err) => {
          reject(err);
        });
    });
  getSingleUser = (id) => this.get("users/" + id);

  register = (name, email, password) =>
    this.post("users/register", { password, email, name });
  logout = () => {
    localStorage.removeItem("token");
  };
  isLoggedIn = () => {
    return localStorage.getItem("token") ? true : false;
  };
  getLoggedInUser = () => {
    try {
      const jwt = localStorage.getItem("token");
      return jwtDecode(jwt);
    } catch (ex) {
      return null;
    }
  };
  isAdmin = () => {
    if (this.isLoggedIn()) {
      if (this.getLoggedInUser().role == "admin") return true;
      else return false;
    } else return false;
  };
  isGuide = () => {
    if (this.isLoggedIn()) {
      if (this.getLoggedInUser().role == "guide") return true;
      else return false;
    } else return false;
  };
  isUser = () => {
    if (this.isLoggedIn()) {
      if (this.getLoggedInUser().role == "user") return true;
      else return false;
    } else return false;
  };
}

let userService = new UserService();
export default userService;
