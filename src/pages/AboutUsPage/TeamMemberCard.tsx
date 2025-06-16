import React from 'react';
import type { TeamMember } from './types';
import styles from './TeamMemberCard.module.css';

interface Props {
  member: TeamMember;
}

export const TeamMemberCard: React.FC<Props> = ({ member }) => (
  <div className={styles.card}>
    <img src={member.photoUrl} alt={member.name} className={styles.photo} />
    <h2 className={styles.name}>{member.name}</h2>
    <p className={styles.role}>{member.role}</p>
    <p className={styles.bio}>{member.bio}</p>
    <p className={styles.contributions}>💡 {member.contributions}</p>
    <a
      href={member.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.githubLink}
    >
      GitHub profile
    </a>
  </div>
);
