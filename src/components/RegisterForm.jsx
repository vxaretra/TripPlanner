import { useForm } from "react-hook-form";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";


export default function RegisterForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();
    //const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if(data.password === data.repeatPassword){
            try{
                await createUserWithEmailAndPassword(auth, data.email, data.password);
                navigate("/", { replace: true });
            }catch (error){
                switch (error.code) {
                    case "auth/email-already-in-use":
                        setError("register", {
                        message: "Email address already in use",
                        });
                        break;
                    case "auth/invalid-email":
                        setError("register", {
                        message: "Email address is not valid",
                        });
                        break;
                    case "auth/weak-password":
                        setError("register", {
                        message: "Please input password with more than 6 characters",
                        });
                        break;
                    default:
                        setError("register", {
                        message: "Something wrong with the server, please try again later",
                        });
                }
            }
        }else{
            setError("register", {
                message: "Password and Repeat Password is not same"
            })
        }
    };
    
    return(
        <div>
            <h2 className="grid items-center justify-center mb-3">Lets Become Travelian 🚀</h2>
            <form className="flex flex-col max-w-md gap-4 mx-auto" 
            onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2 block">
                    <div className="flex justify-between">
                        <Label>Email</Label>
                        <span className="text-sm">Already have an account? <Link to={"/login"} className="font-semibold text-[#0e7490]">Log in</Link></span>
                    </div>
                    <TextInput type="text" name="email" {...register("email", {required: true})} />
                </div>
                <div className="mb-2 block">
                    <Label>Password</Label>
                    <TextInput type="password" name="password" {...register("password", {required: true})} />
                </div>
                <div className="mb-2 block">
                    <Label>Repeat Password</Label>
                    <TextInput type="password" name="repeatPassword" {...register("repeatPassword", {required: true})} />
                </div>
                <div className="mb-2 block">
                    <Button type="submit">Register</Button>
                </div>
                {errors.register && (
                    <Alert color="failure">
                        <span>{errors.register.message}</span>
                    </Alert>
                )}
            </form>
        </div>
    )
}