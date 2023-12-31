import { MdOutlineModeEditOutline } from "react-icons/md";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";
import Dropzone from "react-dropzone";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <>
              <div className="flex gap-x-9 flex-col md:flex-row ">
                <div className="flex-1">
                  <input
                    name="firstName"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    placeholder="First Name"
                    className={
                      Boolean(touched.firstName) && Boolean(errors.firstName)
                        ? "rounded-md py-4 px-3 border bg-white   border-solid border-red-800 shadow-sm focus:outline-none focus:border-red-800 text-sm placeholder:text-slate-400 w-full duration-150 "
                        : "rounded-md py-4 px-3 border bg-white   border-solid border-gray-400 shadow-sm focus:outline-none focus:border-sky-500 text-sm placeholder:text-slate-400 w-full duration-150"
                    }
                  />
                  <p className="text-xs text-red-800 pl-4 mb-4 mt-2">
                    {" "}
                    {errors.firstName && touched.firstName && errors.firstName}
                  </p>
                </div>
                <div className="flex-1">
                  {" "}
                  <input
                    name="lastName"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    placeholder="Last Name"
                    className={
                      Boolean(touched.lastName) && Boolean(errors.lastName)
                        ? "rounded-md py-4 px-3 border bg-white   border-solid border-red-800 shadow-sm focus:outline-none focus:border-red-800 text-sm placeholder:text-slate-400 w-full duration-150 "
                        : "rounded-md py-4 px-3 border bg-white   border-solid border-gray-400 shadow-sm focus:outline-none focus:border-sky-500 text-sm placeholder:text-slate-400 w-full duration-150"
                    }
                  />
                  <p className="text-xs text-red-800 pl-4 mb-4 mt-2">
                    {" "}
                    {errors.lastName && touched.lastName && errors.lastName}
                  </p>
                </div>
              </div>
              <input
                name="location"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.location}
                placeholder="Location"
                className={
                  Boolean(touched.location) && Boolean(errors.location)
                    ? "rounded-md py-4 px-3 border bg-white   border-solid border-red-800 shadow-sm focus:outline-none focus:border-red-800 text-sm placeholder:text-slate-400 w-full duration-150 "
                    : "rounded-md py-4 px-3 border bg-white   border-solid border-gray-400 shadow-sm focus:outline-none focus:border-sky-500 text-sm placeholder:text-slate-400 w-full duration-150"
                }
              />
              <p className="text-xs text-red-800 pl-4 mb-4 mt-2">
                {" "}
                {errors.location && touched.location && errors.location}
              </p>
              <input
                name="occupation"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.occupation}
                placeholder="Occupation"
                className={
                  Boolean(touched.occupation) && Boolean(errors.occupation)
                    ? "rounded-md py-4 px-3 border bg-white   border-solid border-red-800 shadow-sm focus:outline-none focus:border-red-800 text-sm placeholder:text-slate-400 w-full duration-150 "
                    : "rounded-md py-4 px-3 border bg-white   border-solid border-gray-400 shadow-sm focus:outline-none focus:border-sky-500 text-sm placeholder:text-slate-400 w-full duration-150"
                }
              />
              <p className="text-xs text-red-800 pl-4 mb-4 mt-2">
                {" "}
                {errors.occupation && touched.occupation && errors.occupation}
              </p>

              <div className="border border-solid border-gray-400 p-4 rounded-md mb-4">
                <Dropzone
                  acceptedFiles=".jpg,.jpeg,.png"
                  multiple={false}
                  onDrop={(acceptedFiles) =>
                    setFieldValue("picture", acceptedFiles[0])
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <div
                      {...getRootProps()}
                      className="border-2 border-dashed border-sky-300 hover:cursor-pointer p-4"
                    >
                      <input {...getInputProps()} />
                      {!values.picture ? (
                        <p className="text-slate-400 text-sm">
                          Add Picture Here
                        </p>
                      ) : (
                        <div className="flex justify-between">
                          <p className="text-sm">{values.picture.name}</p>
                          <MdOutlineModeEditOutline className="text-xl" />
                        </div>
                      )}
                    </div>
                  )}
                </Dropzone>
              </div>
            </>
          )}

          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="you@example.com"
            className={
              Boolean(touched.email) && Boolean(errors.email)
                ? "rounded-md py-4 px-3 border bg-white   border-solid border-red-800 shadow-sm focus:outline-none focus:border-red-800 text-sm placeholder:text-slate-400 w-full duration-150 "
                : "rounded-md py-4 px-3 border bg-white   border-solid border-gray-400 shadow-sm focus:outline-none focus:border-sky-500 text-sm placeholder:text-slate-400 w-full duration-150"
            }
          />
          <p className="text-xs text-red-800 pl-4 mb-4 mt-2">
            {" "}
            {errors.email && touched.email && errors.email}
          </p>
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            placeholder="password"
            className={
              Boolean(touched.password) && Boolean(errors.password)
                ? "rounded-md py-4 px-3 border bg-white   border-solid border-red-800 shadow-sm focus:outline-none focus:border-red-800 text-sm placeholder:text-slate-400 w-full duration-150 "
                : "rounded-md py-4 px-3 border bg-white   border-solid border-gray-400 shadow-sm focus:outline-none focus:border-sky-500 text-sm placeholder:text-slate-400 w-full duration-150"
            }
          />
          <p className="text-xs text-red-800 pl-4 mb-4 mt-2">
            {errors.password && touched.password && errors.password}
          </p>
          <button
            type="submit"
            className="w-full rounded-md mx-0 mb-8 py-4 bg-sky-300 text-white hover:bg-sky-100 duration-150"
          >
            {isLogin ? "LOGIN" : "REGISTER"}
          </button>
          <p
            className="underline text-sky-300 hover:text-sky-100 cursor-pointer duration-150"
            onClick={() => {
              setPageType(isLogin ? "register" : "login");
              resetForm();
            }}
          >
            {isLogin
              ? "Don't have an account? Sign Up here."
              : "Already have an account? Login here."}
          </p>
        </form>
      )}
    </Formik>
  );
};
export default Form;
