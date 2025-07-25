import React from 'react';
import { teamMembers } from './teamData';
import { TeamMemberCard } from './TeamMemberCard';
import styles from './AboutUsPage.module.css';
import { Link } from 'react-router-dom';

const AboutUsPage: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* ЛОГОТИП RS SCHOOL */}
      <div className={styles.logoContainer}>
        <a href="https://rs.school/" target="_blank" rel="noopener noreferrer">
          <img
            src="./src/assets/rss-logo.svg"
            alt="RS School Logo"
            className={styles.logo}
          />
        </a>
      </div>
      <h1 className={styles.heading}>About our team</h1>
      <p className={styles.description}>
        Our team is a close-knit group of professionals who came together to
        create eCommerce Application. We used agile methodologies, collaborative
        planning, and effective communication to achieve success. Below are the
        project participants, their roles, and contributions:
      </p>
      <div className={styles.grid}>
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.githubUrl} member={member} />
        ))}
      </div>
      <Link to="/" className="product-main-back">
        Back to main page
      </Link>
    </div>
  );
};

export default AboutUsPage;
