import { CreateAccount, DontHaveAccount, EmailAddressLogIn, OrSignInWith, Password, RememberPassword, SignIn, SignInToAccount } from "@/Constant";
import { useAppSelector } from "@/Redux/Hooks";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import imageOne from "../../../../public/assets/images/logo/logo.png";
import imageTwo from "../../../../public/assets/images/logo/logo_dark.png";
import { UserSocialApp } from "./UserSocialApp";
import axios from "axios";

export const UserForm = () => {
  const { i18LangStatus } = useAppSelector((store) => store.langSlice);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  interface User {
    id: number;
    username: string;
    email: string;
  }

  interface LoginResponse {
    isSuccessed: boolean;
    user?: User;
    token?: string | null;
    error?: string;
  }

  const formSubmitHandle = async () => {
    //window.location.reload();
    await login(email, password);
    setShow(false);
  };

  const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await axios.post(
        `https://narcisseapi.gaddielsoftware.com/api/auth/local`,
        {
          identifier: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
        }
      );
      const { jwt, user } = response.data;

      toast.success("login successful");
      Cookies.set("mofi_token", JSON.stringify(true));
      Cookies.set("token", JSON.stringify(jwt));
      Cookies.set("user", JSON.stringify(user));

      localStorage.setItem('token', jwt);
      localStorage.setItem('user', JSON.stringify(user));
      router.push(`/fr/dashboard/project`);

        return { isSuccessed: true, user, token: jwt };

    } catch (error) {

      console.log("Please Enter Valid Email Or Password");
      return { isSuccessed: false, error: 'Please Enter Valid Email Or Password.' };
    }
  };


  return (
    <div>
      <div>
        <Link className="logo" href={`/${i18LangStatus}/dashboard/project`}>
          <img className="img-fluid for-light" src={imageOne.src} alt="login page" />
          <img className="img-fluid for-dark" src={imageTwo.src} alt="login page" />
        </Link>
      </div>
      <div className="login-main">
        <Form className="theme-form">
          <FormGroup>
            <Label className="col-form-label">{EmailAddressLogIn}</Label>
            <Input type="text"  onChange={(event) => setEmail(event.target.value)} placeholder="" />
          </FormGroup>
          <FormGroup>
            <Label className="col-form-label">{Password}</Label>
            <div className="position-relative">
              <Input type={show ? "text" : "password"} onChange={(event) => setPassword(event.target.value)} placeholder="" />
              <div className="show-hide" onClick={() => setShow(!show)}><span className="show"> </span></div>
            </div>
          </FormGroup>
          <FormGroup className="mb-0">
            <div className="checkbox p-0">
              <Input id="checkbox1" type="checkbox" />
              <Label className="text-muted" htmlFor="checkbox1">{RememberPassword}</Label>
            </div>
            <div className="text-end mt-3">
              <Button color="primary" block className="w-100" onClick={formSubmitHandle}>Se Connecter</Button>
            </div>
          </FormGroup>

        </Form>
      </div>
    </div>
  );
};
