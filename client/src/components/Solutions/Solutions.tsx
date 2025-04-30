import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import TorusKnotModel from '../3DModel/TorusKnotModel';
import styles from './Solutions.module.css';

interface SolutionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  iconColorClass: string;
  featureIconColorClass: string;
  delay: number;
}

const SolutionCard = ({ 
  icon, 
  title, 
  description, 
  features, 
  iconColorClass, 
  featureIconColorClass,
  delay 
}: SolutionCardProps) => {
  return (
    <motion.div 
      className={styles.solutionCardWrapper}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className={`${styles.solutionCard} ${styles.techGradient}`}>
        <div className={styles.solutionHeader}>
          <div className={`${styles.iconContainer} ${styles[iconColorClass]}`}>
            {icon}
          </div>
          <h3 className={styles.solutionTitle}>{title}</h3>
        </div>
        <p className={styles.solutionDescription}>
          {description}
        </p>
        <ul className={styles.featuresList}>
          {features.map((feature, index) => (
            <li key={index} className={styles.featureItem}>
              <svg className={`${styles.featureIcon} ${styles[featureIconColorClass]}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const Solutions = () => {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
  });

  const isDarkMode = document.documentElement.classList.contains('dark');
  const modelBackgroundColor = isDarkMode ? '#1f2937' : 'hsl(var(--background))';

  return (
    <section id="solutions" ref={sectionRef} className={`${styles.solutionsSection} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span>Industry Solutions</span>
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Tailored technological solutions to address specific industry challenges and drive growth.
          </motion.p>
        </div>

        <motion.div 
          className={styles.model3DContainer}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <TorusKnotModel 
            backgroundColor={modelBackgroundColor}
            accentColor="#8b5cf6"
            speed={0.5}
          />
        </motion.div>

        <div className={styles.solutionsGrid}>
          <SolutionCard 
            icon={
              <svg className={styles.solutionIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
            title="Healthcare"
            description="Transform patient care with AI-driven diagnostics, telemedicine platforms, and secure health data management systems."
            features={[
              "Predictive analytics for disease prevention",
              "Remote patient monitoring systems",
              "Blockchain-secured medical records"
            ]}
            iconColorClass="primaryBg"
            featureIconColorClass="primaryColor"
            delay={0}
          />

          <SolutionCard 
            icon={
              <svg className={styles.solutionIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            title="Financial Services"
            description="Enhance financial operations with advanced fraud detection, automated compliance, and personalized banking experiences."
            features={[
              "Real-time fraud detection algorithms",
              "Automated regulatory compliance",
              "Predictive market analysis"
            ]}
            iconColorClass="secondaryBg"
            featureIconColorClass="secondaryColor"
            delay={0.2}
          />

          <SolutionCard 
            icon={
              <svg className={styles.solutionIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
              </svg>
            }
            title="Manufacturing"
            description="Optimize production processes with predictive maintenance, supply chain optimization, and smart factory solutions."
            features={[
              "IoT-enabled predictive maintenance",
              "AI-driven quality control",
              "Digital twin technology"
            ]}
            iconColorClass="accentBg"
            featureIconColorClass="accentColor"
            delay={0.4}
          />

          <SolutionCard 
            icon={
              <svg className={styles.solutionIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            title="Retail"
            description="Enhance customer experiences with personalized shopping journeys, inventory optimization, and omnichannel solutions."
            features={[
              "AI-powered product recommendations",
              "Virtual try-on experiences",
              "Smart inventory management"
            ]}
            iconColorClass="primaryBg"
            featureIconColorClass="primaryColor"
            delay={0.6}
          />
        </div>
      </div>
    </section>
  );
};

export default Solutions;
