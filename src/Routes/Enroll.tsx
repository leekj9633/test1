import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

interface FormValue {
  email: string;
  password: string;
  passwordConfirm: string;
}

const Container = styled.form`
  position: relative;
  left: 50px;
  top: 100px;
  color: black;
`;

function Enroll() {
  const {
    register,
    handleSubmit,
    formState: { isDirty, errors },
    getValues
  } = useForm<FormValue>();

  const onSubmit = (data: FormValue) => {
    console.log(data);
  };

  return (
    <div style={{ backgroundColor: "whitesmoke", height: "200vh" }}>
      <Container>
      <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="text"
          placeholder="test@email.com"
          aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
          {...register("email", {
            required: "이메일은 필수 입력입니다.",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "이메일 형식에 맞지 않습니다.",
            },
          })}
        />
        {errors.email && <small role="alert">{errors.email?.message}</small>}
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          placeholder="****************"
          aria-invalid={
            !isDirty ? undefined : errors.password ? "true" : "false"
          }
          {...register("password", {
            required: "비밀번호는 필수 입력입니다.",
            minLength: {
              value: 8,
              message: "8자리 이상 비밀번호를 사용하세요.",
            },
          })}
        />
        {errors.password && (
          <small role="alert">{errors.password?.message}</small>
        )}
        <label htmlFor="password">Confirm password</label>
        <input
          id="password"
          type="password"
          placeholder="*******"
          {...register("passwordConfirm", {
            required: "Password confirmation is required.",
            minLength: {
              value: 7,
              message: "Please use a password of at least 7 characters."
            },
            validate: {
              check: (val) => {
                if (getValues("password") !== val) {
                  return "Passwords do not match";
                }
              }
            }
          })}
        />
        {errors?.passwordConfirm && (
          <small role="alert">{errors.passwordConfirm.message}</small>
        )}
        <button onClick={handleSubmit(onSubmit)}>Submit</button>
      </Container>
      
    </div>
  );
}

export default Enroll;
