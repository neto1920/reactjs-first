import './App.css';
import { Component } from 'react';
import { PostCard } from './components/PostCard';

class App extends Component {
  // Criando objetos de estados, só precisei dos posts
  state = {
    posts: []
  }

  componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () =>{
    // chamando as api 
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts')
    const photoReponse = fetch('https://jsonplaceholder.typicode.com/photos')
    
    // Transformando as api em arrays
    const [posts, photos] = await Promise.all([postsResponse, photoReponse]);
    
    // Transformando as api em json
    const postsJson = await posts.json();
    const photosJson = await photos.json();

    // Como as imagens tem mais quantidade que os postes, então fiz um map de "cada post tera uma imagem"
    const postsAndPhotos = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url}
    });
    
    // setando os states
    this.setState({ posts: postsAndPhotos });
  }

  render(){
    // Chamando o estado post
    const { posts } = this.state;

    // Renderizing my components
    return (
      // Starting with a section for styling
      <section className="container">
        <div className="posts">              
          {posts.map(post => ( // desestruturando meus post            
            <PostCard 
              key={post.id}
              title={post.title}
              body={post.body}
              id={post.id}
              cover={post.cover}
            />
          ))}
        </div>
      </section>
      
    );
  }
}

export default App;