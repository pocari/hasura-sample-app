import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Error from 'next/error';

import { useGetArticleQuery } from '@/generated/graphql';
import styles from './index.module.css';
import { Article } from '@/components/article';
import { formatDate } from '@/utils/date';

const ArticlePage: NextPage = () => {
  const router = useRouter();
  const { articleId } = router.query;

  const { loading, error, data } = useGetArticleQuery({
    variables: {
      id: articleId as string,
    },
  });

  if (loading) {
    return <p>... loading</p>;
  }

  if (error) {
    return <p>{error.toString()}</p>;
  }

  if (!data || !data.articles_by_pk) {
    return <Error statusCode={404} />;
  }

  const { user, subject, content, publishedAt } = data.articles_by_pk;
  if (!publishedAt) {
    return <Error statusCode={404} />;
  }

  const { datetime, isNew } = formatDate(new Date(publishedAt), new Date());
  return (
    <div className={styles.contentContainer}>
      <h1 className={styles.subject}>{subject}</h1>
      <div className={styles.userContainer}>
        <div>
          <img className={styles.userIcon} src="/profile.png" />
        </div>
        <div className={styles.userText}>
          <div className={styles.userId}>
            {user.displayName} @{user.displayId}
          </div>
          <span className={styles.publishedAt}>
            <span>{datetime}</span>
            {isNew ? <span className={styles.newContent}>New!!</span> : ''}
          </span>
        </div>
      </div>
      <div className={styles.content}>
        <Article content={content} />
      </div>
    </div>
  );
};

export default ArticlePage;
