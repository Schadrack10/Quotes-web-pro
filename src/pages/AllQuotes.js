import React, {useEffect} from 'react'
import QuoteList from '../components/quotes/QuoteList'
import useHttp from '../hooks/use-http'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import NoQuotesFound from '../components/quotes/NoQuotesFound'
import { getAllQuotes } from '../components/lib/api'

const DUMMMY_QUOTES = [
  {id:'q1' , author:'schad Botombe', text:'Learning react is fun!!' },
  {id:'q2' , author:'fred legusta', text:'Learning react is fun!!' },
  {id:'q3' , author:'tom hendricks', text:'Learning react is fun!!' },
]


const AllQuotes = () => {
  const {sendRequest, status, data:loadedQuotes , error} = useHttp(getAllQuotes)

console.log(loadedQuotes, 'getting ')

if(status === 'pending'){
  return (
    <div className='centered focused'>
      <LoadingSpinner/>
    </div>
  )
}
if(error){
   return (
    <p>unable to fetch because{error}</p>
   )
}
if(status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)){
  return <NoQuotesFound/>
}
  return (

       <QuoteList quotes={DUMMMY_QUOTES}/>
  
  )
}

export default AllQuotes