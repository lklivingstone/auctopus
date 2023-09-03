import { useFormik } from "formik";
import * as Yup from "yup";
import "./Login.css";
import { Button } from "../../components/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../api/RequestMethods";
import { Link } from "react-router-dom";
import FormInput from "../../components/formInput/FormInput";
import { FormCard } from "../../components/form/FormCard";

const Login = () => {
    const dispatch = useDispatch();
    const { error } = useSelector((state) => state.user_details);
    
    const onSubmit = async (values, actions) => {
        login(dispatch, values);
        actions.resetForm();
    };

  const user = useSelector((state)=>state.user_details.user)
    console.log(user)

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
        password: ""
        },
        validationSchema: Yup.object().shape({
            name: Yup.string().required("Name is required"),
            password: Yup.string()
                .required("Password is required")
        }),
        onSubmit,
    });

  return (
    <FormCard title="LOGIN">
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
                id="password"
                type="password"
                placeholder="Enter your password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.password}
                touched={touched.password}
            />
            <Link
                to="/register"
                className="register-link"
            >
                Create new account
            </Link>
            <div className="button-container">
                <Button 
                    label="LOGIN" 
                    disabled={isSubmitting} 
                    type="submit"
                />
                {
                    error && <p className="error">Error!</p>
                }
            </div>
        </form>
    </FormCard>
  );
};

export default Login;