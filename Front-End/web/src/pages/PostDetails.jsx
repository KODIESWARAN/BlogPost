import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PostDetails(){

    const [post , setPost] = useState(null);
     const { id } = useParams();

     const fetchpost = async() =>{
        try {
              const response = await axios.get(`http://localhost:8000/api/posts/${id}`)
              setPost(response.data);
        } catch (error) {
            console.error('Fetching post : ' , error)
        }
     }

     
     useEffect(() => {
        fetchpost();
     } , []);


     if (!post) {
        return <p>Loading.....</p>
        
     }

   const formated =  Intl.DateTimeFormat('en-US', {
        month:'long',
        day: 'numeric',
        year :'numeric'
     }).format(new Date(post.createAt))


    return <main class="container my-4">
        <div class="row">
            <article class="col-lg-8">
                <h2 class="blog-post-title">{post.title}</h2>
                <p class="blog-post-meta">{formated} by <a href="#">{post.author}</a></p>

                <img class="mb-3 img-fluid" src={post.image} alt=""/>
     
                <div class="blog-post-content">
                    <p>{post.content}</p>
                    
                </div>
            </article>
        </div>
    </main>
    
    

}