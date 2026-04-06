import Link from 'next/link';

interface LogoProps {
  className?: string;
  variant?: 'default' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', variant = 'default', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-10 w-auto',
    lg: 'h-12 w-auto',
  };

  const variantClasses = {
    default: 'text-indigo-600',
    light: 'text-white',
    dark: 'text-gray-900',
  };

  return (
    <div className={`flex items-center ${className}`}>
      <Link href="/" className="flex items-center">
        <div className={`flex items-center ${variantClasses[variant]}`}>
          <svg
            className={`${sizeClasses[size]}`}
            viewBox="0 0 40 40"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40ZM20 36C28.8366 36 36 28.8366 36 20C36 11.1634 28.8366 4 20 4C11.1634 4 4 11.1634 4 20C4 28.8366 11.1634 36 20 36Z"
              fill="currentColor"
            />
            <path
              d="M20 12C15.5817 12 12 15.5817 12 20C12 24.4183 15.5817 28 20 28C24.4183 28 28 24.4183 28 20C28 15.5817 24.4183 12 20 12Z"
              fill="currentColor"
            />
          </svg>
          <span className="ml-2 text-xl font-bold">Longevity Coach</span>
        </div>
      </Link>
    </div>
  );
}
