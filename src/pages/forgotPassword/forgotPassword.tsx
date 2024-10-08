import {
    Input,
    Button,
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import React, { useEffect, useState, SyntheticEvent } from "react";
  import forgotPasswordStyle from "./forgotPassword.module.css";
  import { Link, useLocation, useNavigate } from "react-router-dom";
  import {
    forgotPassword,
  } from "../../services/actions/forgotPassAction";
  import { useAppDispatch } from "../../services/store";

  
  export const ForgotPasswordPage = () => {
    const [email, setEmail] = useState<string>("");
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
  
    const handleSubmit = (e: SyntheticEvent) => {
      e.preventDefault();
      if (!email) {
        alert("Please enter your email!");
        return;
      }

      dispatch(forgotPassword(email));
      navigate("/reset-password", { state: { from: location } });
    };
  
    return (
        <form className={forgotPasswordStyle.main} onSubmit={handleSubmit}>
          <p className="text text_type_main-medium">Восстановление пароля</p>
          <Input
            type={"email"}
            placeholder={"Email"}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            name={"email"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1 mt-6"
          />
          <Button
            extraClass={"mt-6 mb-20"}
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Восстановить
          </Button>
          <p className="mt-4 text text_type_main-small">
            <span className={forgotPasswordStyle.text_grayed}>
              Вспомнили пароль?{" "}
            </span>
            <Link
              className={forgotPasswordStyle.text_blued}
              to="/login"
            >
              Войти
            </Link>
          </p>
        </form>
    );
  };
  