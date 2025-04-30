import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import CubeModel from '@/components/3DModel/CubeModel';
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
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
          <CubeModel />
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
              <h3 className={styles.showcaseSmallTitle}>Augmented Reality</h3>
              <p className={styles.showcaseSmallDescription}>
                Transform how users interact with the world through our advanced AR solutions.
              </p>
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
              <h3 className={styles.showcaseSmallTitle}>IoT Ecosystem</h3>
              <p className={styles.showcaseSmallDescription}>
                Connect and control your devices with our integrated IoT platform.
              </p>
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
              <h3 className={styles.showcaseSmallTitle}>Blockchain Solutions</h3>
              <p className={styles.showcaseSmallDescription}>
                Secure, transparent, and immutable record-keeping for your business operations.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Showcase;
