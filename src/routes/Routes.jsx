import MainLayout from '@/layouts/MainLayout'
import HomePage from '@/pages/HomePage'
import SingleBoardPage from '@/pages/SingleBoardPage'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/board/:id" element={<SingleBoardPage />}/>
    </Route>,
  ),
)
