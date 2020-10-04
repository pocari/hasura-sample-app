import React from 'react';

import styles from './index.module.css';

export const Paragraph: React.FC<{ p: string }> = ({ p }) => {
  return <div className={styles.paragraph}>{p}</div>;
};
