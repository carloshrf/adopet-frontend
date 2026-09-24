import { Eye, EyeOff, type LucideProps } from 'lucide-react';
import type { ComponentPropsWithoutRef, ComponentType } from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  icon?: ComponentType<LucideProps>;
  showPassword?: boolean;
  showPasswordHandler?(isShown: boolean): void;
  label?: string;
}

export const AuthInput: React.FC<InputProps> = ({
  icon: Icon,
  label,
  showPassword = false,
  showPasswordHandler,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm text-gray-600 mb-1.5">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        )}
        {props?.type === 'password' && showPasswordHandler && (
          <button
            type="button"
            className="absolute right-3.5 top-1/2 cursor-pointer -translate-y-1/2 text-gray-400"
            onClick={() => showPasswordHandler(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
        <input
          className={`w-full ${Icon ? 'pl-10' : 'pl-4'} pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition-all placeholder-gray-300`}
          {...props}
          type={
            props.type === 'password'
              ? showPassword
                ? 'text'
                : props.type
              : props.type
          }
        />
      </div>
    </div>
  );
};
