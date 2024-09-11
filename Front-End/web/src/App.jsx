import Footer from "./components/Footer"
import Header from "./components/Header"
import CategoryDetail from "./pages/CategoryDetail"
import PostDetails from "./pages/PostDetails"
import PostList from "./pages/PostList"
import {BrowserRouter as Router , Routes , Route  } from 'react-router-dom'
 

function App() {
  

  return (
    <>
    
         <Router>
          <Header />
             <Routes>
               <Route path="/" element={<PostList />} />
               <Route path="/posts/:id" element={<PostDetails/>} />
               <Route path="/posts/category/:id" element={<CategoryDetail/>} />
             </Routes> 
             <Footer />
         </Router>
 
      
    </>
  )
}

export default App
