import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import blurryImage from './assets/svgs/blurry.svg'
import Layout from './routes/Layout.jsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FeedView from './Routes/FeedView.jsx'
import CreateView from './Routes/CreateView.jsx'
import AboutView from './Routes/AboutView.jsx'
import PostView from './Routes/PostView.jsx'
import EditView from './Routes/EditView.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/'>
          <Route index={false} element={<Layout />}>
            <Route index={true} element={<App />} />
            <Route index={false} path="/feed" element={<FeedView />} />
            <Route index={false} path='/create-post' element={<CreateView />} />
            <Route index={false} path="/feed/post/:id" element={<PostView />} />
            <Route index={false} path="/feed/edit/:id" element={<EditView />} />
            <Route index={false} path='/about' element={<AboutView />} />

          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
