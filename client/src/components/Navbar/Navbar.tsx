import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={styles.logoText}>TechVision</span>
          </div>
          
          <div className={styles.desktopMenu}>
            <a href="#features" className={styles.navLink}>Features</a>
            <a href="#showcase" className={styles.navLink}>Showcase</a>
            <a href="#solutions" className={styles.navLink}>Solutions</a>
            <a href="#contact" className={styles.navLink}>Contact</a>
          </div>
          
          <div className={styles.navControls}>
            <button 
              className={styles.themeToggle} 
              onClick={toggleTheme} 
              aria-label="Toggle theme"
            >
              {/* Sun Icon (shows in dark mode) */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`${styles.themeIcon} ${theme === 'dark' ? styles.visible : styles.hidden}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              {/* Moon Icon (shows in light mode) */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`${styles.themeIcon} ${theme === 'light' ? styles.visible : styles.hidden}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>
            
            <button 
              className={styles.mobileMenuButton} 
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {/* Hamburger Icon */}
              <svg 
                className={isMenuOpen ? styles.hidden : styles.visible} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* Close Icon */}
              <svg 
                className={isMenuOpen ? styles.visible : styles.hidden} 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <a href="#features" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Features</a>
        <a href="#showcase" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Showcase</a>
        <a href="#solutions" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Solutions</a>
        <a href="#contact" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
