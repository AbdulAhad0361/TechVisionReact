import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import styles from './Features.module.css';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorClass: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, colorClass, delay }: FeatureCardProps) => {
  return (
    <motion.div 
      className={styles.featureCardWrapper}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className={`${styles.featureCard} ${styles.techGradient}`}>
        <div className={`${styles.iconContainer} ${styles[colorClass]}`}>
          {icon}
        </div>
        <h3 className={styles.featureTitle}>{title}</h3>
        <p className={styles.featureDescription}>
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const Features = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
  });

  return (
    <section id="features" ref={sectionRef} className={`${styles.featuresSection} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className={styles.titleLine}>Powerful Features</span>
            <span className={`${styles.titleLine} ${styles.highlight}`}>Built for the Future</span>
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our platform integrates cutting-edge technologies to provide innovative solutions for your business needs.
          </motion.p>
        </div>

        <div className={styles.featuresGrid}>
          <FeatureCard 
            icon={
              <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            }
            title="Advanced Analytics"
            description="Gain insights from your data with our powerful analytics tools powered by AI algorithms."
            colorClass="primaryColor"
            delay={0}
          />
          
          <FeatureCard 
            icon={
              <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            }
            title="Secure Infrastructure"
            description="Enterprise-grade security with end-to-end encryption and advanced threat protection."
            colorClass="secondaryColor"
            delay={0.1}
          />
          
          <FeatureCard 
            icon={
              <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
            title="Real-time Processing"
            description="Process data in real-time with our high-performance computing infrastructure."
            colorClass="accentColor"
            delay={0.2}
          />
          
          <FeatureCard 
            icon={
              <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
            }
            title="Smart Automation"
            description="Automate routine tasks with intelligent workflows to increase productivity."
            colorClass="primaryColor"
            delay={0.3}
          />
          
          <FeatureCard 
            icon={
              <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            }
            title="AI Integration"
            description="Leverage machine learning and AI to unlock new insights and capabilities."
            colorClass="secondaryColor"
            delay={0.4}
          />
          
          <FeatureCard 
            icon={
              <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            }
            title="Cloud Infrastructure"
            description="Scalable and reliable cloud solutions designed for high performance."
            colorClass="accentColor"
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
