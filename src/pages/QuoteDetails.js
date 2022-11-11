import React from 'react'
import { Fragment, useEffect } from 'react'
import { useParams, Route, Link, useRouteMatch } from 'react-router-dom'
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../components/lib/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'

const QuoteDetails = () => {

  const params = useParams()
  const match = useRouteMatch()

  const { quoteId } = params;

  const { sendRequest, status, data: loadedQuotes, error } = useHttp(getSingleQuote, true)

  useEffect(() => {
    sendRequest(quoteId)
  }, [sendRequest, quoteId])

  if (status === 'pending') {
    return <div className='centered'>
      <LoadingSpinner />
    </div>
  }

  if (!loadedQuotes) {
    return <p>No quote found!</p>
  }



  console.log(params)

  const DUMMMY_QUOTES = [
    { id: 'q1', author: 'schad Botombe', text: 'Learning react is fun!!' },
    { id: 'q2', author: 'fred legusta', text: 'Learning react is fun!!' },
    { id: 'q3', author: 'tom hendricks', text: 'Learning react is fun!!' },
  ]

  const quote = DUMMMY_QUOTES.find(quote => quote.id === params.quoteId)


if(error){
  return <p className='centered'>
    error getting the comments because : {error}
  </p>
}


  if (!loadedQuotes) {
    return <h3> No Quotes found here!!</h3>
  }



  return (
    <Fragment>

      <HighlightedQuote text={loadedQuotes.text} author={loadedQuotes.author} />

      <Route path={match.path} exact>
        <div className={'centered'}>
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  )
}

export default QuoteDetails