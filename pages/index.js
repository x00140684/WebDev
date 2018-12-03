import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import SearchForm from '../components/SearchForm';
import Select from 'react-select';
const apikey = '34879fe047b94604aa13d1af0d0f48fd';

const options = [
  { value: 'the-irish-times', label: 'The Irish Times' },
  { value: 'abc-news', label: 'ABC News' },
  { value: 'fox-news', label: 'Fox News' },
  { value: 'bbc-news', label: 'BBC News' }
  
];
//For some reason the date only displays correctly on the Music News
function getDate(pub)
{
    let time = new Date(pub);
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
   return `Published Date: ${months[time.getMonth()]} ${time.getDay()} ${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`
}

async function getNews(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export default class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newsSource: "",
      url: "",
      articles: []
    }
  }

  static async getInitialProps(req) {
    let source = 'the-irish-times'
    if(typeof req.query.source != "undefined")
      source=req.query.source;
    const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apikey}`;
    const data = await getNews(url);
  
    if(Array.isArray(data.articles))
    {
      return{
        articles: data.articles,
        source: source
      }
    }
    else {
      console.error(data);
      req.statusCode = 400
      req.end(data.message);
    }
  }

  setNewsSource = (input) => {
    this.setState({
      newsSource: input,
      url: `https://newsapi.org/v2/top-headlines?sources=${input}&apiKey=${apikey}`
    })
  }

  searchNewsApi = (event) => {
    this.setState({
      newsSource: `${event.target.innerText}`,
      url: `https://newsapi.org/v2/${event.target.name}&apiKey=${apikey}`
    })
  }

  handleDropDown = (option) => {
    this.setState({
      newsSource: option.value,
      url: `https://newsapi.org/v2/top-headlines?sources=${option.value}&apiKey=${apikey}`
    })
  }

  async componentDidUpdate(prevPops, prevState)
  {
    if(this.state.url !== prevState.url)
    {
      const data = await getNews(this.state.url);
      if(Array.isArray(data.articles))
      {
        this.state.articles = data.articles;
        this.setState(this.state);
      }
    }
  }

  

  render() {
    if(this.state.articles.length == 0)
      this.state.articles = this.props.articles
   
    return (
      <div>
      <SearchForm setNewsSource={this.setNewsSource} />
      <Select
      
        onChange={this.handleDropDown}
        options={options}
      />
      <ul className="newsMenu">
        <li><a href="#" onClick={this.searchNewsApi} name="top-headlines?country=ie">Top Headlines Ireland</a></li>
        <li><a href="#" onClick={this.searchNewsApi} name="top-headlines?country=ie&category=music">Top Business News Ireland</a></li>
        <li><a href="#" onClick={this.searchNewsApi} name="top-headlines?country=ie&category=weather">Weather Ireland</a></li>
      </ul>
      
      {this.state.articles.map((article, index) => (
        <section>
          
          <img src={article.urlToImage} alt="No Provided Article Image" className="img-article" />
          <div className="newsContent">
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <p>{article.content}</p>
          <p className="author">Author: {article.author}</p>
    
          <em>{getDate(article.publishedAt)}</em>
          {article.source.id !== null &&
            <p><a href={article.url}>Read More</a></p>
          }
          <br></br>
          </div>
         
        </section>
      ))}
     
      <style jsx>{`
     
          section {
            width: 100%;
            
            margin: 1em;

            background-color: white;
            overflow: hidden;
 background-color: #a5a5a5;
          }
          .newsContent{
         
          }
         .img-article{
           width:30%;
           margin-right: 2em;
           float: left;
           border: 1px solid black;
         }
       
          .author {
            font-style: italic;
            font-size: 0.8em;
          }

        
          .newsMenu {
            display: flex;
            flex-direction: row;
            margin: 0;
            padding: 0;
            margin-top: 20px;
          }
          .newsMenu li {
            display: inline-table;
            padding-left: 20px;
          }
          .newsMenu li a {
            font-size: 1em;
            color: blue;
            display: block;
            text-decoration: none;
          }
          .newsMenu li a:hover {
            color: #005f5f;
            text-decoration: underline;
          }
          
        `}</style>
      </div>
    )
  }
}