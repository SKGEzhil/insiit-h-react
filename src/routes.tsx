import {createBrowserRouter} from "react-router-dom";
import {lazy, Suspense} from 'react';
import ErrorPage from "./pages/ErrorPage.tsx";


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

export const base_route = "";

export const routes = createBrowserRouter([

        {
            element: <Suspense><MainLayout/></Suspense>,
            errorElement: <ErrorPage/>,
            children: [
                {
                    element: <Suspense><ProtectedRoute/></Suspense>,
                    children: [
                        {path: `${base_route}/admin`, element: <Suspense><AdminPage/></Suspense>},
                    ]
                },
                {path: `${base_route}/`, element: <Suspense><HomePage/></Suspense>},
                {path: `${base_route}/ask`, element: <Suspense><AskQuestionPage/></Suspense>},
                {path: `${base_route}/ask/related`, element: <Suspense><RelatedQnsLayout/></Suspense>},
                {
                    element: <Suspense><BlogPageLayout/></Suspense>,
                    children: [
                        {path: `${base_route}/academics`, element: <Suspense><AcademicsPage/></Suspense>},
                        {path: `${base_route}/others`, element: <Suspense><OthersPage/></Suspense>},
                    ]
                },

            ],
        },
        {
            element: <Suspense><ForumLayout/></Suspense>,
            errorElement: <ErrorPage/>,
            children: [
                {path: `${base_route}/search`, element: <Suspense><SearchPage/></Suspense>},
                {path: `${base_route}/forum`, element: <Suspense><ForumPage/></Suspense>},
                {path: `${base_route}/question/:id`, element: <Suspense><QuestionPage/></Suspense>},
            ],
        },
    ]
);