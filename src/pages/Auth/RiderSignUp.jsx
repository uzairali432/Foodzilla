import { useForm } from "react-hook-form";
import logo from "../../assets/Logo.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerUser } from "../../config/firebase/auth";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/common/InputField";
import BtnSignUp from "../../components/common/BtnSignUp";
import { useAuthContext } from "../../components/hooks/useAuth";

const formSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Your name must have more than 2 characters",
    })
    .max(20, {
      message: "Your name must have less than 20 characters",
    }),

  email: z
    .string()
    .email({ message: "Enter a valid email" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "Email is not valid",
    }),

  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, { message: "Enter number with country code" }),

  vehicleType: z.string().regex(/^(Car|Bike|Truck|Bus|Van)$/i, {
    message: "Vehicle type must be Car, Bike, Truck, Bus, or Van",
  }),

  licenseNumber: z.string().regex(/^[A-Za-z0-9\-\s]{5,20}$/, {
    message:
      "Number must be 5–20 characters (letters, numbers, dashes, spaces allowed)",
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
const RiderSignUp = () => {
  const {dispatch} = useAuthContext()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const navigate = useNavigate();
  const onSubmitAll = async (data) => {
    try {
      const userCred = await registerUser({
        email: data.email,
        password: data.password,
        role: "rider",
        extraData: {
          name: data.name,
          phone: data.phoneNumber,
          vehicleType: data.vehicleType,
          licenseNumber: data.licenseNumber,
        },
      });
        dispatch({
          type: "REGISTER_USER",
          payload: data,
        })
      const userData = {
        uid: userCred.user.uid,
        email: userCred.email,
        role: "rider",
      };
      localStorage.setItem("user", JSON.stringify(userData));
      if (userData) {
        navigate("/RiderPage");
      }
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8">
        <div className="flex flex-col md:flex-row w-11/12 max-w-5xl gap-8 md:gap-12">
          <div className="flex flex-col justify-center items-center p-8 w-1/2">
            <img src={logo} alt="App Icon" className="mb-4" />
            <p className="text-lg text-[#0E2A45] text-center leading-relaxed">
              Deliver Fast • Earn Smart <br />
              Join FoodZilla Riders 🚴
            </p>
          </div>

          <div className="flex flex-col justify-center bg-white rounded-xl shadow-lg p-8 w-full md:w-1/2">
            <div className="w-full max-w-md mx-auto">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmitAll)}>
                <div className="grid grid-cols-1 gap-4">
                  <InputField
                    register={register}
                    name="name"
                    type="text"
                    placeholder="Full Name"
                    error={errors.name}
                  />
                  <InputField
                    register={register}
                    name="email"
                    type="email"
                    placeholder="Email"
                    error={errors.email}
                  />

                  <InputField
                    register={register}
                    name="phoneNumber"
                    type="text"
                    placeholder="Phone Number"
                    error={errors.phoneNumber}
                  />

                  <InputField
                    register={register}
                    name="vehicleType"
                    type="text"
                    placeholder="vehicle Type"
                    error={errors.vehicleType}
                  />
                  <InputField
                    register={register}
                    name="licenseNumber"
                    type="text"
                    placeholder="License Number"
                    error={errors.licenseNumber}
                  />

                  <InputField
                    register={register}
                    name="password"
                    type="password"
                    placeholder="Password"
                    error={errors.password}
                  />
                </div>
                <BtnSignUp
                  isSubmitting={isSubmitting}
                  linkTo={"/RiderLogin"}
                  linkText={
                    <p className="text-gray-600">
                      Already have an account ?{" "}
                      <span className="text-[#E64D21]">Sign In</span>
                    </p>
                  }
                  btnText={"Sign Up"}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RiderSignUp;
