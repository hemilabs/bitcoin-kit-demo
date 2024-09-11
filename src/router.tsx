import { Layout } from 'components/layout'
import { HomePage } from 'pages/home/page'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

const routes = createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route path="home" element={<HomePage />} />
  </Route>,
)

export const router = createBrowserRouter(routes)
