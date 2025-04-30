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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formState);
    // In a real app, you would handle form submission to a backend here
    alert('Thank you for your message! We will get back to you soon.');
    setFormState({
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      message: ''
    });
  };

  return (
    <section id="contact" ref={sectionRef} className={`${styles.contactSection} ${isVisible ? styles.visible : ''}`}>
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
        
        <motion.div 
          className={styles.formContainer}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
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
                  ></textarea>
                </div>
              </div>
              
              <div className={styles.fullWidth}>
                <button type="submit" className={styles.submitButton}>
                  Send Message
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
