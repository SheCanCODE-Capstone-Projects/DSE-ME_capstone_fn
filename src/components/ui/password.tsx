export default function SignupWithGoogle() {
  const handleGoogleSignup = () => {
    console.log('Google signup clicked');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8">
        {/* OR Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-600 text-sm font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Signup Button */}
        <button
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
        >
          {/* Google Icon */}
          <svg
            className="w-5 h-5"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M533.5 278.4c0-17.8-1.6-35-4.7-51.8H272v98h146.9c-6.4 34.6-25.8 63.9-55.1 83.6v69.4h88.9c52-47.9 81.8-118.8 81.8-199.2z"
              fill="#4285F4"
            />
            <path
              d="M272 544.3c74.8 0 137.6-24.9 183.5-67.5l-88.9-69.4c-24.7 16.5-56.3 26.1-94.6 26.1-72.8 0-134.5-49.1-156.5-115.4H25.3v72.6C71.2 487 165.7 544.3 272 544.3z"
              fill="#34A853"
            />
            <path
              d="M115.5 319.1c-11.7-34.5-11.7-71.7 0-106.2V140.3H25.3c-50.6 97.3-50.6 213.7 0 311l90.2-72.2z"
              fill="#FBBC05"
            />
            <path
              d="M272 107.2c39.9-.6 77.5 14.2 106.3 41.5l79.7-79.7C407.9 24.6 345.1 0 272 0 165.7 0 71.2 57.3 25.3 140.3l90.2 72.6c22-66.3 83.7-115.7 156.5-105.7z"
              fill="#EA4335"
            />
          </svg>

          {/* Button Text */}
          <span className="text-gray-700 font-medium">
            Signup with Google
          </span>
        </button>
      </div>
    </div>
  );
}
