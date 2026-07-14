type AuthIllustrationsProps = {
  isSignup: boolean;
};

export default function AuthIllustrations(props: AuthIllustrationsProps) {
  const { isSignup } = props;
  return (
    <div className="absolute inset-0 flex">
      {/* Login Illustration */}
      <div
        className={`flex w-1/2 items-center justify-center transition-all duration-700 ease-in-out will-change-transform ${isSignup ? "-translate-x-full opacity-0" : "translate-x-0 opacity-100"}`}
      >
        <img
          src="src/Components/Assets/Authentication/Login.png"
          alt="login illustration"
          className="w-[700px]"
        />
      </div>
      {/* Signup Illustration */}
      <div
        className={`will-change-transform flex w-1/2 items-center justify-center transition-all duration-700 ease-in-out ${isSignup ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      >
        <img
          src="src/Components/Assets/Authentication/Signup.png"
          alt="signup illustration"
          className="w-[600px]"
        />
      </div>
    </div>
  );
}
