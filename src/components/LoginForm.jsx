import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/", { replace: true });
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-login-credentials":
          setError("login", {
            message: "Please check your email and password and try again.",
          });
          break;
        default:
          setError("login", {
            message: "Something wrong with the server, please try again later",
          });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-center">
        Sign in to your account
      </h1>
      <form
        className="flex flex-col max-w-md gap-4 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email address" />
          </div>
          <TextInput
            id="email"
            type="email"
            required
            {...register("email", { required: true })}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            id="password"
            type="password"
            required
            {...register("password", { required: true })}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Sign in
        </Button>
        {errors.login && (
          <Alert color="failure">
            <span>{errors.login.message}</span>
          </Alert>
        )}
      </form>
    </div>
  );
}
