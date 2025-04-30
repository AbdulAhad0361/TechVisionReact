import { useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import styles from './Contact.module.css';

const Contact = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
  });
  
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      console.log('Form submitted:', formState);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after successful submission
      setFormState({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className={`${styles.contactSection} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.backgroundDecoration}></div>
      
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span>Get in Touch</span>
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Ready to transform your business with cutting-edge technology? Connect with our team of experts today.
          </motion.p>
        </div>
        
        <div className={styles.contentGrid}>
          <motion.div 
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Contact Information</h3>
              <p className={styles.infoDescription}>
                Have questions about our solutions? Need a consultation? Our team is ready to assist you.
              </p>
              
              <div className={styles.contactItems}>
                <div className={styles.contactItem}>
                  <div className={styles.contactIconWrapper}>
                    <svg className={styles.contactIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className={styles.contactDetails}>
                    <span className={styles.contactLabel}>Phone</span>
                    <a href="tel:+1234567890" className={styles.contactValue}>+1 (234) 567-890</a>
                  </div>
                </div>
                
                <div className={styles.contactItem}>
                  <div className={styles.contactIconWrapper}>
                    <svg className={styles.contactIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className={styles.contactDetails}>
                    <span className={styles.contactLabel}>Email</span>
                    <a href="mailto:info@techvision.com" className={styles.contactValue}>info@techvision.com</a>
                  </div>
                </div>
                
                <div className={styles.contactItem}>
                  <div className={styles.contactIconWrapper}>
                    <svg className={styles.contactIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className={styles.contactDetails}>
                    <span className={styles.contactLabel}>Location</span>
                    <span className={styles.contactValue}>101 Innovation Drive, Tech Valley, CA 94043</span>
                  </div>
                </div>
                
                <div className={styles.contactItem}>
                  <div className={styles.contactIconWrapper}>
                    <svg className={styles.contactIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className={styles.contactDetails}>
                    <span className={styles.contactLabel}>Hours</span>
                    <span className={styles.contactValue}>Monday - Friday: 9:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink} aria-label="LinkedIn">
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="Twitter">
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="Facebook">
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#" className={styles.socialLink} aria-label="Instagram">
                  <svg className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className={styles.formContainer}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {isSuccess ? (
              <div className={styles.successMessage}>
                <svg className={styles.successIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className={styles.successTitle}>Thank you!</h3>
                <p className={styles.successText}>Your message has been received. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="firstName" className={styles.label}>First name</label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        value={formState.firstName}
                        onChange={handleChange}
                        className={styles.input}
                        required
                        placeholder="Your first name"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label htmlFor="lastName" className={styles.label}>Last name</label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        value={formState.lastName}
                        onChange={handleChange}
                        className={styles.input}
                        required
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.fullWidth}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formState.email}
                        onChange={handleChange}
                        className={styles.input}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.fullWidth}>
                    <label htmlFor="company" className={styles.label}>Company</label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="text" 
                        id="company" 
                        name="company" 
                        value={formState.company}
                        onChange={handleChange}
                        className={styles.input}
                        placeholder="Company name (optional)"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.fullWidth}>
                    <label htmlFor="message" className={styles.label}>Message</label>
                    <div className={styles.inputWrapper}>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={4} 
                        value={formState.message}
                        onChange={handleChange}
                        className={styles.textarea}
                        required
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className={styles.fullWidth}>
                    <button 
                      type="submit" 
                      className={`${styles.submitButton} ${isSubmitting ? styles.submitting : ''}`}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className={styles.spinnerIcon} viewBox="0 0 24 24">
                            <circle className={styles.spinnerCircle} cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4"></circle>
                          </svg>
                          Sending...
                        </>
                      ) : 'Send Message'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
