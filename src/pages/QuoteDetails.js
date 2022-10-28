import React from 'react'
import { Fragment } from 'react'
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom'
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'

const QuoteDetails = () => {

  const params = useParams()
  const match = useRouteMatch()


  console.log(match)

  const DUMMMY_QUOTES = [
    {id:'q1' , author:'schad Botombe', text:'Learning react is fun!!' },
    {id:'q2' , author:'fred legusta', text:'Learning react is fun!!' },
    {id:'q3' , author:'tom hendricks', text:'Learning react is fun!!' },
  ]
  
const quote  = DUMMMY_QUOTES.find(quote => quote.id === params.quoteId)


if(!quote){
  return <h3> No Quotes found here!!</h3>
}

  

  return (
    <Fragment>

       <HighlightedQuote text={quote.text} author={quote.author}/>

       <Route path={match.path} exact>
        <div className={'centered'}>
        <Link className="btn--flat" to={`${match.url}/comments`}>
                  Load comments
            </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments/>
      </Route>

    </Fragment>
  )
}

export default QuoteDetails