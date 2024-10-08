import {
    Input,
    Button,
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import React, { useEffect, useState, FormEvent  } from "react";
  import resetPasswordStyle from "./resetPassword.module.css";
  import { Link, useNavigate , useLocation} from "react-router-dom";
  import { useAppSelector, useAppDispatch } from "../../services/store";
  import { resetPassword } from "../../services/actions/formAction";
  import { TFormInput } from "../../types/types";

  type TResetForm = Pick<TFormInput, "password"> & {token: string}
  
  function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState<TResetForm>({ password: "", token: "" });
    const changeInputValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    };
    const isForgotPassword = useAppSelector( (state) => state.form.isForgotPassword)
    // console.log(isForgotPassword)
    useEffect( () => {
      if(!isForgotPassword) {
        navigate("/forgot-password")
      }
    }, [navigate])


    const handleSumbit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let password = formValues.password
      let token = formValues.token

      dispatch(resetPassword({password, token}))
      navigate("/", { replace: true});
    };
  
    return (
        <form className={resetPasswordStyle.main} onSubmit={handleSumbit}>
          <p className="text text_type_main-medium">Восстановление пароля</p>
          <Input
              name="password"
              type="password"
              icon={"ShowIcon"}
              placeholder="Введите новый пароль"
              extraClass="mt-6"
              onChange={changeInputValue}
              value={formValues.password}
          />
          <Input
              name="token"
              type="text"
              extraClass="mt-6"
              placeholder="Введите код из письма"
              value={formValues.token}
              onChange={changeInputValue}
          />
          <Button
            extraClass={"mt-6 mb-20"}
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Сохранить
          </Button>
          <p className="mt-4 text text_type_main-small">
            <span className={resetPasswordStyle.text_grayed}>
              Вспомнили пароль?{" "}
            </span>
            <Link
              className={resetPasswordStyle.text_blued}
              to="/login"
            >
              Войти
            </Link>
          </p>
        </form>
    );
  };

  export default ResetPasswordPage;
  