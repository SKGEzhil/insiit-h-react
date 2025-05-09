import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from 'react';
import ErrorPage from "./pages/ErrorPage.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import UnderConstructionPage from "./pages/UnderConstructionPage.tsx";


const MainLayout = lazy(() => import("./layouts/mainLayout.tsx"));
const AskQuestionPage = lazy(() => import("./pages/AskQuestionPage.tsx"));
const RelatedQnsLayout = lazy(() => import("./layouts/relatedQnsLayout.tsx"));
const ForumLayout = lazy(() => import("./layouts/forumLayout.tsx"));
const SearchPage = lazy(() => import("./pages/SearchPage.tsx"));
const ForumPage = lazy(() => import("./pages/ForumPage.tsx"));
const QuestionPage = lazy(() => import("./pages/QuestionPage.tsx"));
const HomePage = lazy(() => import("./pages/HomePage.tsx"));
const AdminPage = lazy(() => import("./pages/AdminPage.tsx"));
const ProtectedRoute = lazy(() => import("./layouts/ProtectedRoute.tsx"));
const BlogPageLayout = lazy(() => import("./layouts/blogPageLayout.tsx"));
const AcademicsPage = lazy(() => import("./pages/AcademicsPage.tsx"));
const OthersPage = lazy(() => import("./pages/OthersPage.tsx"));
const FAQPage = lazy(() => import("./pages/FAQPage.tsx"));
const ProfilePage = lazy(() => import("./pages/ProfilePage.tsx"));

export const base_route = "";

/**
 * The routes of the application
 * This is a tree of routes that define the structure of the application
 * @type {BrowserRouter}
 * @name routes
 * @returns {BrowserRouter}
 * @example
 * /
 * ├── /ProtectedRoute (requires authentication)
 *      └── /admin
 * ├── /MainLayout
 *      ├── /home
 *      ├── /ask
 *      ├── /ask/related
 *      └── /BlogPageLayout
 *           ├── /academics
 *           └── /others
 * ├── /ForumLayout
 *     ├── /search
 *     ├── /forum
 *     ├── /faq
 *     └── /question/:id
 *
 *
 */
export const routes = createBrowserRouter([

        {
            element: <Suspense><MainLayout/></Suspense>,
            errorElement: <ErrorPage/>,
            children: [
                {path: `${base_route}/bookmarks`, element: <Suspense><UnderConstructionPage/></Suspense>},
                {
                    element: <Suspense><ProtectedRoute requireAdmin={true} heading={"Admin Page"} subheading={"Login as admin to continue"}/></Suspense>,
                    children: [
                        {path: `${base_route}/admin`, element: <Suspense><AdminPage/></Suspense>},
                    ]
                },
                {
                    element: <Suspense><ProtectedRoute heading={"Ask your Questions"} subheading={"Please sign up to ask questions"}/></Suspense>,
                    children: [
                        {path: `${base_route}/ask`, element: <Suspense><AskQuestionPage/></Suspense>},
                        {path: `${base_route}/ask/related`, element: <Suspense><RelatedQnsLayout/></Suspense>},
                    ]
                },
                {path: `${base_route}/`, element: <Suspense><HomePage/></Suspense>},
                {
                    element: <Suspense><BlogPageLayout/></Suspense>,
                    children: [
                        {path: `${base_route}/academics`, element: <Suspense><UnderConstructionPage/></Suspense>},
                        {path: `${base_route}/others`, element: <Suspense><UnderConstructionPage/></Suspense>},
                    ]
                },
                {path: `${base_route}/about`, element: <Suspense><AboutPage/></Suspense>},
                {path: `${base_route}/profile/:email`, element: <Suspense><ProfilePage/></Suspense>},
                {path: `${base_route}/privacy`, element: <Suspense><UnderConstructionPage/></Suspense>},
            ],
        },
        {
            element: <Suspense><ForumLayout/></Suspense>,
            errorElement: <ErrorPage/>,
            children: [
                {path: `${base_route}/search`, element: <Suspense><SearchPage/></Suspense>},
                {path: `${base_route}/forum`, element: <Suspense><ForumPage/></Suspense>},
                {path: `${base_route}/faq`, element: <Suspense><FAQPage/></Suspense>},
                {path: `${base_route}/question/:id`, element: <Suspense><QuestionPage/></Suspense>},
                {path: `${base_route}/question/:id/content/:contentId`, element: <Suspense><QuestionPage/></Suspense>},
            ],
        },
        {
            path: `*`,
            element: <Suspense><ErrorPage/></Suspense>,
        }
    ]
);