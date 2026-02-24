import { useForm } from "react-hook-form";
import logo from "../../assets/Logo.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginUser } from "../../utils/authService";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/common/InputField";
import BtnSignUp from "../../components/common/BtnSignUp";

const formSchema = z.object({
  Email: z
    .string()
    .email({ message: "Enter a valid email" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Email is not valid",
    }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/[a-z]/, { message: "Must include at least 1 lowercase letter" })
    .regex(/[A-Z]/, { message: "Must include at least 1 uppercase letter" })
    .regex(/\d/, { message: "Must include at least 1 number" })
    .regex(/[@$!%*?&]/, {
      message: "Must include at least 1 special character (@$!%*?&)",
    }),
});
const RiderLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(formSchema) });

  const navigate = useNavigate()
  
  const onSubmitAll = async (data) => {
    try {
      const resp = await loginUser({
        email: data.Email,
        password: data.password,
      });
      localStorage.setItem("token", resp.token);
      localStorage.setItem("user", JSON.stringify(resp.user));
      if (resp.user.role === "rider") {
        navigate('/RiderPage');
      }
    } catch (error) {
      alert(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
      <div className="flex flex-col md:flex-row w-11/12 max-w-5xl gap-8 md:gap-12">
        <div className="flex flex-col justify-center items-center p-8 w-1/2">
          <img src={logo} alt="App Icon" className="mb-4" />
          <p className="text-lg text-[#0E2A45] text-center leading-relaxed">
            Fast & Fresh <br /> At Your Doorstep 🍴
          </p>
        </div>

        <div className="flex flex-col justify-center bg-white rounded-xl shadow-lg p-8 w-full md:w-1/2">
          <div className="w-full max-w-md mx-auto">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmitAll)}>
              <InputField
                register={register}
                name="Email"
                type="email"
                placeholder="Email"
                error={errors.Email}
              />
              <InputField
                register={register}
                name="password"
                type="password"
                placeholder="Password"
                error={errors.password}
              />

              <BtnSignUp
                isSubmitting={isSubmitting}
                linkText={
                  <p className="text-gray-600">
                    Create an account ?{" "}
                    <span className="text-[#E64D21]">Sign Up</span>
                  </p>
                }
                btnText={"Login"}
                linkTo={"/RiderSignUp"}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiderLogin;
