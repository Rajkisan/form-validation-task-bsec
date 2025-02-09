import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .matches(/[A-Za-z]/, "Must contain at least one letter")
    .matches(/[0-9]/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character (@$!%*?&)")
    .required("Password is required"),
});

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://127.0.0.1:5001/login", JSON.stringify(data), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      alert("Login Success");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Username" {...register("username")} />
        <p style={{ color: "red" }}>{errors.username?.message}</p>

        <input type="password" placeholder="Password" {...register("password")} />
        <p style={{ color: "red" }}>{errors.password?.message}</p>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
