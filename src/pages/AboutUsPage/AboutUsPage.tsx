import React from 'react';
import { teamMembers } from './teamData';
import { TeamMemberCard } from './TeamMemberCard';
import styles from './AboutUsPage.module.css';

const AboutUsPage: React.FC = () => {
  return (
    <div className={styles.container}>
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
    </div>
  );
};

export default AboutUsPage;
