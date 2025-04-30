import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.companyInfo}>
            <div className={styles.logo}>
              <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className={styles.logoText}>TechVision</span>
            </div>
            <p className={styles.companyDescription}>
              Transforming businesses through cutting-edge technology solutions designed for the future.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Twitter">
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className={styles.linksSection}>
            <div className={styles.linksColumn}>
              <div className={styles.linksGroup}>
                <h3 className={styles.linksTitle}>Solutions</h3>
                <ul className={styles.linksList}>
                  <li><a href="#" className={styles.footerLink}>AI & Machine Learning</a></li>
                  <li><a href="#" className={styles.footerLink}>Cloud Infrastructure</a></li>
                  <li><a href="#" className={styles.footerLink}>Cybersecurity</a></li>
                  <li><a href="#" className={styles.footerLink}>IoT Platforms</a></li>
                </ul>
              </div>
              
              <div className={styles.linksGroup}>
                <h3 className={styles.linksTitle}>Industries</h3>
                <ul className={styles.linksList}>
                  <li><a href="#" className={styles.footerLink}>Healthcare</a></li>
                  <li><a href="#" className={styles.footerLink}>Financial Services</a></li>
                  <li><a href="#" className={styles.footerLink}>Manufacturing</a></li>
                  <li><a href="#" className={styles.footerLink}>Retail</a></li>
                </ul>
              </div>
            </div>
            
            <div className={styles.linksColumn}>
              <div className={styles.linksGroup}>
                <h3 className={styles.linksTitle}>Company</h3>
                <ul className={styles.linksList}>
                  <li><a href="#" className={styles.footerLink}>About</a></li>
                  <li><a href="#" className={styles.footerLink}>Careers</a></li>
                  <li><a href="#" className={styles.footerLink}>Partners</a></li>
                  <li><a href="#" className={styles.footerLink}>News</a></li>
                </ul>
              </div>
              
              <div className={styles.linksGroup}>
                <h3 className={styles.linksTitle}>Support</h3>
                <ul className={styles.linksList}>
                  <li><a href="#" className={styles.footerLink}>Documentation</a></li>
                  <li><a href="#" className={styles.footerLink}>Guides</a></li>
                  <li><a href="#" className={styles.footerLink}>API Status</a></li>
                  <li><a href="#" className={styles.footerLink}>Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} TechVision, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
