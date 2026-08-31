import { ArrowRight } from 'lucide-react';

interface AuthButtonProps {
  label: string;
}

export const AuthButton: React.FC<AuthButtonProps> = ({ label }) => {
  return (
    <button className="flex items-center justify-center gap-2 mt-2 shadow-md shadow-emerald-200 bg-emerald-500 w-full hover:bg-emerald-600 active:bg-emerald-700 text-white py-3 rounded-xl transiction-colors">
      {label}
      <ArrowRight className="w-4 h-4" />
    </button>
  );
};
