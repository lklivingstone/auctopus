import { useFormik } from "formik";
import * as Yup from "yup";
import "./Register.css";
import { Button } from "../../components/button/Button";
import { useSelector } from "react-redux";
import { register } from "../../api/RequestMethods";
import { useNavigate } from "react-router-dom";
import { FormCard } from "../../components/form/FormCard";
import FormInput from "../../components/formInput/FormInput";

const Register = () => {
    const { isFetching, error } = useSelector((state) => state.user_details);
    const navigate= useNavigate()
    const onSubmit = async (values, actions) => {
        try {
            const response= await register(values)
            actions.resetForm();
            if (response.status===200) {
                navigate("/login")
            }
        }
        catch (err) {

        }
    };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
      college: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      phone: Yup.string()
        .matches(/^\d+$/, "Phone number must contain only digits")
        .min(10, "Phone number must be at least 10 digits")
        .required("Phone number is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      address: Yup.string().required("Address is required"),
      college: Yup.string().required("College name is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required")
    }),
    onSubmit,
  });

  return (
    <FormCard title="REGISTER">
        <form className="login-container" onSubmit={handleSubmit} autoComplete="off">
            <FormInput
                id="name"
                type="text"
                placeholder="Enter your name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                touched={touched.name}
            />

            <FormInput
                id="phone"
                type="text"
                placeholder="Enter your phone number"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.phone}
                touched={touched.phone}
            />
            
            <FormInput
                id="email"
                type="text"
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                touched={touched.email}
            />

            <FormInput
                id="address"
                type="text"
                placeholder="Enter your address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.address}
                touched={touched.address}
            />
          
            <FormInput
                id="college"
                type="text"
                placeholder="Enter your college name"
                value={values.college}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.college}
                touched={touched.college}
            />

            <FormInput
                id="password"
                type="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
            />

            <FormInput
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.confirmPassword}
                touched={touched.confirmPassword}
            />

            <div className="button-container">
                <Button label="SUBMIT" disabled={isSubmitting} type="submit" />
            </div>
        </form>
    </FormCard>
  );
};

export default Register;
