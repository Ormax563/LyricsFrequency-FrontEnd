import { TopAuthors, SearchAuthor, GithubRepo } from '../pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <TopAuthors></TopAuthors>
  },
  {
    path: '/dashboard',
    element: <SearchAuthor></SearchAuthor>
  },
  {
    path: '/github',
    element: <GithubRepo></GithubRepo>
  },
]);

const Router = () => <RouterProvider router={router} />;

export { Router };