import React, {useEffect} from 'react'
// import QuoteForm from '../components/quotes/QuoteForm'
import QuoteForm from '../components/quotes/QuoteForm'
import { useHistory } from 'react-router-dom'
import useHttp from '../hooks/use-http'
import { addQuote } from '../components/lib/api'

const NewQuote = () => {

  const {sendRequest, status} =  useHttp(addQuote,'')

  const history =  useHistory()

  const addQuoteData = (quoteData)=>{
     sendRequest(quoteData)
  }

useEffect(()=>{

 if(status === 'completed'){
    history.push('/quotes')
 }


},[status, history])


  return (
    <div>
      <h1>
        NEW QUOTE
      </h1>
      <QuoteForm isLoading={status === 'pending'} onAddQuote={addQuoteData}/>
    </div>
  )
}

export default NewQuote