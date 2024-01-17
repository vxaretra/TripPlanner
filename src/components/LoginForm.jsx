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
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate("/", { replace: true });
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-login-credentials":
          setError("root", {
            message: "Please check your email and password and try again.",
          });
          break;
        default:
          setError("root", {
            message: "Something wrong with the server, please try again later.",
          });
      }
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
            color={errors.email ? "failure" : "gray"}
            helperText={errors.email && <span>{errors.email.message}</span>}
            {...register("email", {
              required: "Please fill your email.",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Email not valid.",
              },
            })}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            type="password"
            color={errors.password ? "failure" : "gray"}
            helperText={
              errors.password && <span>{errors.password.message}</span>
            }
            {...register("password", {
              required: "Please fill your password.",
            })}
          />
        </div>
        <Button type="submit" disabled={isSubmitting}>
          Sign in
        </Button>
        {errors.root && (
          <Alert color="failure">
            <span>{errors.root.message}</span>
          </Alert>
        )}
      </form>
    </div>
  );
}
