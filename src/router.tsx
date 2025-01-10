import { Layout } from 'components/layout';
import { CodeEditorPage } from 'pages/codeEditor/page';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path="code-editor" element={<CodeEditorPage />} />
  </Route>,
);

export const router = createBrowserRouter(routes);
