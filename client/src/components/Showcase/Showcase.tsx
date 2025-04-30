import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import SphereModel from '@/components/3DModel/SphereModel';
import styles from './Showcase.module.css';

// Import local SVG images
import tech1 from '@/assets/images/tech1.svg';
import tech2 from '@/assets/images/tech2.svg';
import tech3 from '@/assets/images/tech3.svg';
import tech4 from '@/assets/images/tech4.svg';
import tech5 from '@/assets/images/tech5.svg';

const Showcase = () => {
  const [sectionRef, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
  });

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1]
      },
    },
  };

  const tagStyles = {
    ai: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    connectivity: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    compute: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
    security: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300',
    blockchain: 'bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-300',
  };

  return (
    <section id="showcase" ref={sectionRef} className={`${styles.showcaseSection} ${isVisible ? styles.visible : ''}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <motion.h2 
            className={styles.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span>Technology Showcase</span>
          </motion.h2>
          <motion.p 
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Explore our cutting-edge technology solutions that drive innovation and transform businesses.
          </motion.p>
        </div>

        {/* 3D Model Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.modelContainer}
        >
          <SphereModel />
          <div className={styles.modelOverlay}>
            <span className={styles.modelText}>Interactive Technology Network</span>
          </div>
        </motion.div>

        <motion.div 
          className={styles.showcaseGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Featured showcase items - row 1 */}
          <motion.div 
            className={`${styles.showcaseItem} ${styles.featured}`} 
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <div className={styles.showcaseImageContainer}>
              <img 
                src={tech1} 
                alt="Neural Interface Technology" 
                className={styles.showcaseImage}
              />
            </div>
            <div className={styles.showcaseContent}>
              <div className={styles.tagContainer}>
                <span className={`${styles.tag} ${tagStyles.ai}`}>AI</span>
                <span className={`${styles.tag} ${tagStyles.compute}`}>Neural Computing</span>
              </div>
              
              <div className={styles.showcaseIconWrapper}>
                <span className={styles.showcaseIcon}>
                  <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </span>
                <div className={styles.showcaseTitleWrapper}>
                  <h3 className={styles.showcaseTitle}>Neural Interface Technology</h3>
                  <p className={styles.showcaseDescription}>
                    Our neural interface technology bridges human cognition with digital systems, enabling seamless interaction between mind and machine.
                  </p>
                </div>
              </div>
              
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Direct thought-to-text translation</span>
                </div>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>99.8% accuracy in intent detection</span>
                </div>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Non-invasive neural sensors</span>
                </div>
              </div>
              
              <div className={styles.showcaseLink}>
                <a href="#" className={styles.learnMoreLink}>
                  Learn more
                  <svg className={styles.arrowIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={`${styles.showcaseItem} ${styles.featured}`} 
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <div className={styles.showcaseImageContainer}>
              <img 
                src={tech2} 
                alt="Quantum Computing Platform" 
                className={styles.showcaseImage}
              />
            </div>
            <div className={styles.showcaseContent}>
              <div className={styles.tagContainer}>
                <span className={`${styles.tag} ${tagStyles.compute}`}>Quantum</span>
                <span className={`${styles.tag} ${tagStyles.security}`}>Encryption</span>
              </div>
              
              <div className={styles.showcaseIconWrapper}>
                <span className={`${styles.showcaseIcon} ${styles.secondary}`}>
                  <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </span>
                <div className={styles.showcaseTitleWrapper}>
                  <h3 className={styles.showcaseTitle}>Quantum Computing Platform</h3>
                  <p className={styles.showcaseDescription}>
                    Our quantum computing platform solves complex problems exponentially faster than traditional computing methods.
                  </p>
                </div>
              </div>
              
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>1000+ qubits architecture</span>
                </div>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Quantum error correction</span>
                </div>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Cloud-based quantum API</span>
                </div>
              </div>
              
              <div className={styles.showcaseLink}>
                <a href="#" className={`${styles.learnMoreLink} ${styles.secondaryLink}`}>
                  Learn more
                  <svg className={styles.arrowIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Small showcase items - row 2 */}
          <motion.div 
            className={styles.showcaseSmallItem} 
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <div className={styles.showcaseSmallImageContainer}>
              <img 
                src={tech3} 
                alt="Augmented Reality" 
                className={styles.showcaseSmallImage}
              />
            </div>
            <div className={styles.showcaseSmallContent}>
              <div className={styles.tagContainer}>
                <span className={`${styles.tag} ${tagStyles.ai}`}>AR/VR</span>
              </div>
              
              <div className={styles.showcaseIconWrapper}>
                <span className={styles.showcaseIcon}>
                  <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                <div className={styles.showcaseTitleWrapper}>
                  <h3 className={styles.showcaseSmallTitle}>Augmented Reality</h3>
                  <p className={styles.showcaseSmallDescription}>
                    Transform how users interact with the world through our advanced AR solutions. Our cutting-edge technology blends digital information seamlessly.
                  </p>
                </div>
              </div>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Immersive visual overlays</span>
                </div>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Real-time object recognition</span>
                </div>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Spatial mapping technology</span>
                </div>
              </div>
              <div className={styles.showcaseLink}>
                <a href="#" className={styles.learnMoreLink}>
                  Learn more
                  <svg className={styles.arrowIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.showcaseSmallItem} 
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <div className={styles.showcaseSmallImageContainer}>
              <img 
                src={tech4} 
                alt="IoT Ecosystem" 
                className={styles.showcaseSmallImage}
              />
            </div>
            <div className={styles.showcaseSmallContent}>
              <div className={styles.tagContainer}>
                <span className={`${styles.tag} ${tagStyles.connectivity}`}>IoT</span>
                <span className={`${styles.tag} ${tagStyles.ai}`}>Smart Home</span>
              </div>
              
              <div className={styles.showcaseIconWrapper}>
                <span className={`${styles.showcaseIcon} ${styles.secondary}`}>
                  <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </span>
                <div className={styles.showcaseTitleWrapper}>
                  <h3 className={styles.showcaseSmallTitle}>IoT Ecosystem</h3>
                  <p className={styles.showcaseSmallDescription}>
                    Connect and control your devices with our integrated IoT platform. Our comprehensive ecosystem provides seamless connectivity for smart homes.
                  </p>
                </div>
              </div>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>5G-enabled connectivity</span>
                </div>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>AI-powered device management</span>
                </div>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Secure end-to-end encryption</span>
                </div>
              </div>
              <div className={styles.showcaseLink}>
                <a href="#" className={styles.learnMoreLink}>
                  Learn more
                  <svg className={styles.arrowIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.showcaseSmallItem} 
            variants={itemVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
          >
            <div className={styles.showcaseSmallImageContainer}>
              <img 
                src={tech5} 
                alt="Blockchain Solutions" 
                className={styles.showcaseSmallImage}
              />
            </div>
            <div className={styles.showcaseSmallContent}>
              <div className={styles.tagContainer}>
                <span className={`${styles.tag} ${tagStyles.blockchain}`}>Blockchain</span>
                <span className={`${styles.tag} ${tagStyles.security}`}>Decentralized</span>
              </div>
              
              <div className={styles.showcaseIconWrapper}>
                <span className={`${styles.showcaseIcon} ${styles.accentColor}`}>
                  <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                <div className={styles.showcaseTitleWrapper}>
                  <h3 className={styles.showcaseSmallTitle}>Blockchain Solutions</h3>
                  <p className={styles.showcaseSmallDescription}>
                    Secure, transparent, and immutable record-keeping for your business operations. Our blockchain solutions provide unprecedented security.
                  </p>
                </div>
              </div>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Smart contract automation</span>
                </div>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Distributed ledger technology</span>
                </div>
                <div className={styles.featureItem}>
                  <svg className={styles.featureIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Tokenization capabilities</span>
                </div>
              </div>
              <div className={styles.showcaseLink}>
                <a href="#" className={styles.learnMoreLink}>
                  Learn more
                  <svg className={styles.arrowIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;
