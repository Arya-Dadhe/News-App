import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export class News extends Component {
  static defaultProps={
    country:'in',
    pageSize:5,
    category:'general'
  }

  static propTypes={
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  capitalizer=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
  }
 constructor(props){
  super(props);
  // console.log("Hy this side constructor from news component");
  this.state={
      articles:[],
      loading: false, 
      page:1,
      totalResults:0
  }
  document.title=`${this.capitalizer(this.props.category)} - BharatTimes`
 }

 async updateNews(){
  this.props.setProgress(10);
  const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1edff2257f654629a223d46ca722ceaf&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data= await fetch(url);
  let parsedData = await data.json()
  // console.log(parsedData);
  this.setState({
    articles: parsedData.articles,
    totalResults: parsedData.totalResults,
    loading:false
    })
    this.props.setProgress(100);
 }
async componentDidMount(){
  // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1edff2257f654629a223d46ca722ceaf&page=1&pageSize=${this.props.pageSize}`;
  // this.setState({loading:true});
  // let data= await fetch(url);
  // let parsedData = await data.json()
  // // console.log(parsedData);
  // this.setState({
  //   articles: parsedData.articles,
  //   totalResults: parsedData.totalResults,
  //   loading:false
  //   })
  this.updateNews();
 }
 handlePreviousClick = async ()=>{
  // console.log("Pre")
  // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1edff2257f654629a223d46ca722ceaf&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
  // this.setState({loading:true});
  // let data= await fetch(url);
  // let parsedData = await data.json();
  // console.log(parsedData);
  // this.setState({
  //   page:this.state.page-1,
  //   articles: parsedData.articles,
  //   loading:false
  // }
  // )
  this.setState({page: this.state.page-1});
  this.updateNews();
 }
 handleNextClick = async ()=>{
  //  console.log("Nex");
  // if(!(this.state.page+1 > Math.ceil((this.state.totalResults)/this.props.pageSize))){
  // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1edff2257f654629a223d46ca722ceaf&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
  // this.setState({loading:true});
  // let data= await fetch(url);
  // let parsedData = await data.json();
  // console.log(parsedData);
  // this.setState({
  //   page:this.state.page+1,
  //   articles: parsedData.articles,
  //   loading:false
  // })
  //  } 
   this.setState({page: this.state.page+1})
   this.updateNews();
  }
  fetchMoreData = async () => {
   this.setState({page: this.state.page+ 1})
   const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1edff2257f654629a223d46ca722ceaf&page=${this.state.page}&pageSize=${this.props.pageSize}`;
   let data= await fetch(url);
   let parsedData = await data.json()
   this.setState({
     articles: this.state.articles.concat(parsedData.articles),
     totalResults: parsedData.totalResults,
     })
    };
  render() {
    return (
      // <div className='container my-2'> 
      //   <h1 className='text-center' style={{margin: "30px"}} >Bharat Times - Top {this.capitalizer(this.props.category)} Headlines </h1>
      //   {this.state.loading && <Spinner/>}
      //   <div className="row">
      //     {!this.state.loading && this.state.articles.map((element)=>{
      //       return <div className="col" key={element.url}> 
      //       {/* key kuch dena pdta hai jo unique banae sabko */}
      //       <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
      //     </div>
      //     })}
      //     <div className="d-flex justify-content-between">
      //     <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}> &larr; Previous</button>
      //     <button disabled={this.state.page+1 > Math.ceil((this.state.totalResults)/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>
      //     </div>
      //   </div>
      // </div>
      <> 
      { 
      this.props.category==='general' &&
          <h1 className='text-center' style={{margin: "30px"}} >Bharat Times - Latest Headlines </h1>
      }
      { this.props.category!=='general' &&
          <h1 className='text-center' style={{margin: "30px"}} >Bharat Times - Top {this.capitalizer(this.props.category)} Headlines </h1>
      }
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner/>}
        >
       <div className="container">
       <div className="row">
             {this.state.articles.map((element,index)=>{
            return <div className="col" key={index}> 
            {/* key kuch dena pdta hai jo unique banae sabko */}
            <NewsItem  title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
       </div>
          })}
          </div>
          </div>
          </InfiniteScroll>
          </>
    )
  }
}

export default News
