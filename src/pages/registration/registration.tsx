  import {
    Button,
    Input,
  } from "@ya.praktikum/react-developer-burger-ui-components";
  import React, { useEffect, useState, SyntheticEvent, FormEvent } from "react";
  import registrationStyle from "./registration.module.css";
  import { Link, useNavigate } from "react-router-dom";
  import { useAppDispatch, useAppSelector } from "../../services/store";
  import { registerUser } from "../../services/actions/registerAction";

  
  function RegistraionPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const navigate = useNavigate()
    const user = useAppSelector((state) => state.form.userInfo);
    // const isUserRegistered = useSelector( (state) => state.auth);

    const dispatch = useAppDispatch();
    useEffect(() => {
      if (user) {
        navigate( '/' );
      }
    }, [navigate, user]);
  
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(registerUser({ email, password, name}));
    };
  
    return (

        <form className={registrationStyle.main} onSubmit={handleSubmit}>
          <p className="text text_type_main-medium">Регистрация</p>
          <Input
            type={"text"}
            placeholder={"Name"}
            onChange={(e) => setName(e.target.value)}
            value={name}
            name={"name"}
            error={false}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1 mt-6"
          />
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
          <Input
            type={isPasswordShown ? "text" : "password"}
            placeholder={"Password"}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            name={"password"}
            error={false}
            icon={isPasswordShown ? "HideIcon" : "ShowIcon"}
            onIconClick={() => setIsPasswordShown(!isPasswordShown)}
            errorText={"Ошибка"}
            size={"default"}
            extraClass="ml-1 mt-6"
          />
          <div className={"mt-6 mb-20"}>
            <Button htmlType="submit" type="primary" size="medium">
              Зарегистрироваться
            </Button>
          </div>
          <p className="text text_type_main-small">
            <span className={registrationStyle.text_grayed}>
              Уже зарегистрорваны?{" "}
            </span>
            <Link
              className={registrationStyle.text_blued}
              to="/login"
            >
              Войти
            </Link>
          </p>
        </form>

    );
  };

  export default RegistraionPage;