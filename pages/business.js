import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import SearchForm from '../components/SearchForm';
import Select from 'react-select';
const apikey = '34879fe047b94604aa13d1af0d0f48fd';

const options = [
  { value: 'business-insider', label: 'Business Insider' },
  { value: 'business-insider-uk', label: 'Business Insider UK' }
];
function getDate(datepub)
{
    let time = new Date(datepub);
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
   return `Published Date: ${months[time.getMonth()]} ${time.getDay()} ${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`
}

async function getBusiness(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    return error;
  }
}

export default class Business extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bussinessSource: "",
      url: "",
      articles: []
    }
  }

  static async getInitialProps(req) {
    let source = 'business-insider'
    if(typeof req.query.source != "undefined")
      source=req.query.source;
    const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apikey}`;
    const data = await getBusiness(url);
  
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

  setBusinessSource = (input) => {
    this.setState({
      bussinessSource: input,
      url: `https://newsapi.org/v2/top-headlines?sources=${input}&apiKey=${apikey}`
    })
  }

  searchBusinessAPI = (event) => {
    this.setState({
      bussinessSource: `${event.target.innerText}`,
      url: `https://newsapi.org/v2/${event.target.name}&apiKey=${apikey}`
    })
  }

  handleDropDown = (option) => {
    this.setState({
      bussinessSource: option.value,
      url: `https://newsapi.org/v2/top-headlines?sources=${option.value}&apiKey=${apikey}`
    })
  }

  async componentDidUpdate(prevPops, prevState)
  {
    if(this.state.url !== prevState.url)
    {
      const data = await getBusiness(this.state.url);
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
  
      <Select
      
        onChange={this.handleDropDown}
        options={options}
      />
 
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