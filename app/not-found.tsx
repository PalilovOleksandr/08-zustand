import Link from 'next/link';
import css from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 Not Found',
  description: 'Oops! The page you are looking for does not exist.',
  openGraph: {
    title: '404 Not Found',
    description:
      'The page you were looking for could not be found. Please check the URL or return to the homepage.',
    url: 'https://08-zustand-pink.vercel.app/404',
    images: [
      {
        url: 'https://i0.wp.com/learn.onemonth.com/wp-content/uploads/2017/08/1-10.png?w=845&ssl=1',
        width: 1200,
        height: 630,
        alt: 'Page Not Found',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <section>
      <div className={css.container}>
        <h1 className={css.title}>404 - Page not found</h1>
        <p className={css.description}>
          Sorry, the page you are looking for does not exist.
        </p>
        <Link href="/" className={css.buttonLink}>
          Go back home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
