import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  password: string;
}

export default function PasswordStrength({ password }: Props) {
    const hasMinLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const requirements = [
      hasMinLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
      hasSpecialChar,
    ];

    const passedRequirements = requirements.filter(Boolean).length;

    const strength =
      passedRequirements <= 2
        ? "Weak"
        : passedRequirements === 3 || passedRequirements === 4
          ? "Medium"
          : "Strong";

    const progressColor =
      strength === "Weak"
        ? "bg-red-500"
        : strength === "Medium"
          ? "bg-yellow-500"
          : "bg-green-500";

    const progressWidth = `${(passedRequirements / 5) * 100}%`;

  return (
    <div className="space-y-4 rounded-md border border-gray-200 bg-gray-50 p-5">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="font-medium">Password Strength</span>

          <span
            className={`font-semibold ${
              strength === "Weak"
                ? "text-red-500"
                : strength === "Medium"
                  ? "text-yellow-600"
                  : "text-green-600"
            }`}
          >
            {strength}
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full transition-all duration-500 ease-out ${progressColor}`}
            style={{ width: progressWidth }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 text-sm">
        <Requirement valid={hasMinLength} text="At least 8 characters" />

        <Requirement valid={hasUpperCase} text="Contains uppercase letter" />

        <Requirement valid={hasLowerCase} text="Contains lowercase letter" />

        <Requirement valid={hasNumber} text="Contains a number" />

        <Requirement
          valid={hasSpecialChar}
          text="Contains a special character"
        />
      </div>
    </div>
  );
}

function Requirement({ valid, text }: { valid: boolean; text: string }) {
  return (
    <div className="flex items-center gap-2">
      <FontAwesomeIcon
        icon={valid ? faCircleCheck : faCircleXmark}
        className={valid ? "text-green-500" : "text-gray-400"}
      />

      <span className={valid ? "text-green-600" : "text-gray-500"}>{text}</span>
    </div>
  );
}
