import Form from "./Form";
const Login = () => {
  return (
    <div className="bg-gray-100 h-screen w-screen">
      <div className="w-full py-4 px-6 text-center bg-white">
        <p className="text-3xl font-bold  text-sky-400">Sociopedia</p>{" "}
      </div>
      <div className="rounded-3xl my-8 mx-auto p-8 bg-white w-11/12 lg:w-1/2 ">
        <h5 className="mb-6 font-medium">
          Welcome to Socipedia, the Social Media for Sociopaths!
        </h5>
        <Form />
      </div>
    </div>
  );
};
export default Login;
