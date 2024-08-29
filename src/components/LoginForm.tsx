"use client";

import { login } from "@/actions";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction, pending] = useFormState<any, FormData>(
    login,
    undefined
  );
  return (
    <form action={formAction}>
      <input
        type="text"
        name="username"
        required
        placeholder="username"
        autoCapitalize="off"
        autoComplete="off"
        autoCorrect="off"
      />
      <input type="password" name="password" required placeholder="password" />

      <button disabled={pending}>{pending ? "Loading..." : "Login"}</button>
      {
        // 如果有错误，显示错误
        state?.error && <p className="text-red-500">{state.error}</p>
      }
    </form>
  );
};

export default LoginForm;
