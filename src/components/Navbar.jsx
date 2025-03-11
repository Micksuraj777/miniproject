import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AnimatedEye from './AnimatedEye';
import { UserButton, SignInButton } from '@clerk/clerk-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Donor Details', href: '/donor' },
    { name: 'Receiver Details', href: '/receiver' },
    { name: 'Check Compatibility', href: '/check' }
  ];

  return (
    <nav className='max-w-screen-xl mx-auto py-8 flex justify-between items-center px-4'>
      <div className='flex items-center'>
        <div className='pr-10'>
          <Link to='/' className='flex items-center gap-4'>
            <AnimatedEye size={60} />
            <AnimatedEye size={60} />
          </Link>
        </div>
        <ul className='flex justify-center gap-10 text-lg'>
          {navItems.map((item) => (
            <li key={item.name} className='hover:underline'>
              <Link
                to={item.href}
                className={`${
                  location.pathname === item.href ? 'text-blue-500 font-semibold underline' : 'text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* User Menu */}
      <div className='relative'>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;

