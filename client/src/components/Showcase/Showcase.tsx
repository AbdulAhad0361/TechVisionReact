import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import styles from './Showcase.module.css';

const Showcase = () => {
  const [sectionRef, isVisible] = useIntersectionObserver({
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

        <motion.div 
          className={styles.showcaseGrid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Featured showcase items - row 1 */}
          <motion.div className={`${styles.showcaseItem} ${styles.featured}`} variants={itemVariants}>
            <div className={styles.showcaseImageContainer}>
              <img 
                src="https://images.unsplash.com/photo-1581090700227-8e3b56af6d66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Abstract technology visual" 
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

          <motion.div className={`${styles.showcaseItem} ${styles.featured}`} variants={itemVariants}>
            <div className={styles.showcaseImageContainer}>
              <img 
                src="https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Modern tech devices" 
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
          <motion.div className={styles.showcaseSmallItem} variants={itemVariants}>
            <div className={styles.showcaseSmallImageContainer}>
              <img 
                src="https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Digital innovation concept" 
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

          <motion.div className={styles.showcaseSmallItem} variants={itemVariants}>
            <div className={styles.showcaseSmallImageContainer}>
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Tech workspace" 
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

          <motion.div className={styles.showcaseSmallItem} variants={itemVariants}>
            <div className={styles.showcaseSmallImageContainer}>
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Advanced technology" 
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
