import React, { Component } from 'react';

export default class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    formSubmitted = event => {
        if(event.target.newsSource.value != "")
        {
            this.props.setNewsSource(event.target.newsSource.value)
        }

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div className="search1" id="search">
                    <p>Seach for your favourite news sources</p>
                    <form onSubmit={this.formSubmitted}>
                        <input name="newsSource" type="text" />
                        <button className="button">Search</button>
                    </form>
                </div>
                <style jsx>{`
               .search1{
                 margin: 2em;
               }
  .button{
    border-radius: 3px;
    margin-left: 5px;
  }
  input[type=text] {
    background-color: white;
}
          
        `}</style>
            </div>

            
        )
    }
}