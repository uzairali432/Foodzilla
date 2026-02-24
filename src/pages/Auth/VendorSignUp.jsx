import { useForm } from "react-hook-form";
import logo from "../../assets/Logo.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerUser } from "../../utils/authService";
import { useNavigate } from "react-router-dom";
import InputField from "../../components/common/InputField";
import BtnSignUp from "../../components/common/BtnSignUp";
import { useAuthContext } from "../../components/hooks/useAuth";

const formSchema = z.object({
  businessName: z
    .string()
    .min(2, {
      message: "Your business name must have more than 2 characters",
    })
    .max(20, {
      message: "Your business name must have less than 20 characters",
    }),

  name: z
    .string()
    .min(2, {
      message: "owner name must have more than 2 characters",
    })
    .max(20, {
      message: "owner name must have less than 20 characters",
    }),

  email: z
    .string()
    .email({ message: "Enter a valid email" })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "email is not valid",
    }),

  phoneNumber: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, { message: "Enter number with country code" }),

  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" })
    .max(100, { message: "Address must be less than 100 characters" })
    .regex(/^[a-zA-Z0-9\s,\.\-/#]+$/, {
      message:
        "Address can only contain letters, numbers, spaces, commas, dots, and dashes",
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

const VendorSignUp = () => {
  const { dispatch } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(formSchema) });

  let navigate = useNavigate();

  const onSubmitAll = async (data) => {
    try {
      const resp = await registerUser({
        email: data.email,
        password: data.password,
        role: "vendor",
        name: data.name,
        phoneNumber: data.phoneNumber,
      });
      // optionally you can dispatch or update context here
      localStorage.setItem("token", resp.token);
      localStorage.setItem("user", JSON.stringify(resp.user));
      navigate("/VendorPage");
    } catch (err) {
      alert(err?.response?.data?.message || err.message);
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center col-span-2 bg-gray-50 py-8">
        <div className="flex flex-col md:flex-row w-11/12 max-w-5xl gap-8 md:gap-12">
          <div className="flex flex-col justify-center items-center p-8 w-1/2">
            <img src={logo} alt="App Icon" className="mb-4" />
            <p className="text-lg text-[#0E2A45] text-center leading-relaxed">
              Manage Your Business <br />
              Grow with FoodZilla 🍴
            </p>
          </div>

          <div className="flex flex-col justify-center bg-white rounded-xl shadow-lg p-8 w-full md:w-1/2">
            <div className="w-full max-w-md mx-auto">
              <form className="space-y-6" onSubmit={handleSubmit(onSubmitAll)}>
                <div className="grid grid-cols-1 gap-4">
                  <InputField
                    register={register}
                    name="businessName"
                    type="text"
                    placeholder="Business Name"
                    error={errors.businessName}
                  />

                  <InputField
                    register={register}
                    name="name"
                    type="text"
                    placeholder="Owner Name"
                    error={errors.name}
                  />
                  <InputField
                    register={register}
                    name="email"
                    type="email"
                    placeholder="email"
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
                    name="address"
                    type="text"
                    placeholder="Address"
                    error={errors.address}
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
                  linkText={
                    <p className="text-gray-600">
                      Already have an account? {" "}
                      <span className="text-[#E64D21]">Login</span>
                    </p>
                  }
                  btnText={"Sign Up"}
                  linkTo={'/VendorLogin'}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorSignUp;
