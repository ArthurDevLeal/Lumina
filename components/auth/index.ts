import Counter from "./counter";
import FinishCard from "./finish/finish-card";
import finishHeader from "./finish/finish-header";
import LoginForm from "./login/login-form";
import LoginHeader from "./login/login-header";
import RegisterForm from "./register/register-form";
import RegisterHeader from "./register/register-header";
import Root from "./root";
import RedirectButton from "./user/redirect-button";
import UserForm from "./user/user-form";
import UserHeader from "./user/user-header";

export const Auth = {
  Counter: Counter,
  Redirect: RedirectButton,
  Root: Root,
  User: {
    Header: UserHeader,
    Form: UserForm,
  },
  Register: {
    Form: RegisterForm,
    Header: RegisterHeader,
  },
  Login: {
    Header: LoginHeader,
    Form: LoginForm,
  },
  Finish: {
    Card: FinishCard,
    Header: finishHeader,
  },
};
