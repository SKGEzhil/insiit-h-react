import {createBrowserRouter} from "react-router-dom";
import MainLayout from "./layouts/mainLayout.tsx";
import AskQuestionPage from "./pages/AskQuestionPage.tsx";
import RelatedQnsLayout from "./layouts/relatedQnsLayout.tsx";
import AcademicsPage from "./pages/AcademicsPage.tsx";
import ForumLayout from "./layouts/forumLayout.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import ForumPage from "./pages/ForumPage.tsx";
import QuestionPage from "./pages/QuestionPage.tsx";
import ElementRenderer from "./components/elementRenderer.tsx";

export const base_route = "";

export const routes = createBrowserRouter([

    { path: `${base_route}/temp`, element: <ElementRenderer />},
    {
            element: <MainLayout />,
            children: [
                { path: `${base_route}/ask`, element: <AskQuestionPage /> },
                { path: `${base_route}/ask/related`, element: <RelatedQnsLayout /> },
                { path: `${base_route}/academics`, element: <AcademicsPage />},
            ],
        },
        {
            element: <ForumLayout />,
            children: [
                {path: `${base_route}/search`, element: <SearchPage />},
                { path: `${base_route}/forum`, element: <ForumPage /> },
                { path: `${base_route}/question/:id`, element: <QuestionPage /> },
            ],
        },
    ]
);