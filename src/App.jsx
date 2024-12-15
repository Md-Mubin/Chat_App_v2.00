import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import LayoutOne from './Layouts/LayoutOne'
import Auth from './Pages/Auth'
import { useSelector } from 'react-redux'
import LayoutTwo from './Layouts/LayoutTwo'
import UserProfile from './Components/UserProfile/UserProfile'
import AllUserPage from './Pages/AllUserPage'
import AllRequestPage from './Pages/AllRequestPage'
import AllFriendsPage from './Pages/AllFriendsPage'
import BlockListPage from './Pages/BlockListPage'
import ChatsPage from './Pages/ChatsPage'
import ForgetPassword from './Pages/ForgetPassword'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import app from './firebase.config'

function App() {

  const reduxData = useSelector((state) => state.userData.value)

  const myRoute = createBrowserRouter(
    createRoutesFromElements(

      reduxData ?

        <Route>
          <Route path='/' element={<LayoutTwo />}>
            <Route index element={<UserProfile />} />
            <Route path='/allUsers' element={<AllUserPage />} />
            <Route path='/allRequests' element={<AllRequestPage />} />
            <Route path='/allFriends' element={<AllFriendsPage />} />
            <Route path='/blockLists' element={<BlockListPage />} />
            <Route path='/chats' element={<ChatsPage />} />
          </Route>
        </Route>

        :

        <Route>
          <Route path='/' element={<LayoutOne />}>
            <Route index element={<Auth />} />
            <Route path='/forgetPassword' element={<ForgetPassword />} />
          </Route>
        </Route>
    )
  )

  return (
    <>
      <ToastContainer />
      <RouterProvider router={myRoute} />
    </>
  )
}

export default App
