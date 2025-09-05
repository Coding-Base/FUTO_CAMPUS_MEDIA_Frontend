import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../components/futocampusmedia.jpg'

function NavItem({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-white bg-indigo-600' : 'text-gray-700 hover:text-indigo-600'}`
      }
    >
      {children}
    </NavLink>
  );
}

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img style={{width:'2%'}} src={logo} alt='logo' /> <Link 
  to="/" 
  className="text-xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 transition-all duration-500 drop-shadow-md hover:drop-shadow-xl tracking-tight"
>
  FUTO CAMPUS MEDIA
</Link>
        </div>

        <nav className="hidden md:flex items-center gap-2">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/utme">Post UTME</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/contact">Contact</NavItem>
          <NavItem to="/policy">Policy</NavItem>
        </nav>

        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600">
        ☰
      </button>
      {open && (
        <div className="absolute right-4 mt-2 w-48 bg-white border rounded shadow z-50">
          <Link to="/" className="block px-4 py-2">Home</Link>
          <Link to="/utme" className="block px-4 py-2">Post UTME</Link>
          <Link to="/about" className="block px-4 py-2">About</Link>
          <Link to="/contact" className="block px-4 py-2">Contact</Link>
          <Link to="/policy" className="block px-4 py-2">Policy</Link>
        </div>
      )}
    </div>
  );
}
