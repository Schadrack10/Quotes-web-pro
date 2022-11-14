import { Fragment, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {


  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1
    } else {
      return quoteA.id < quoteB.id ? 1 : -1
    }
  })
}

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [filterTerm, setFilterTerm] = useState('')


  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get("sort") === "asc";

  const changeSortingHanlder = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${(isSortingAscending ? 'desc' : 'asc')}`
    })
    history.push(`${location.pathname}?sort=${(isSortingAscending ? 'desc' : 'asc')}`);
  };

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending)

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHanlder}>Sort {isSortingAscending ? 'Descending' : 'Ascending'}</button>
      </div>

      <input className={classes.searchInput} placeholder="find your quote ?" value={filterTerm} onChange={(e) => setFilterTerm(e.target.value)} style={{ padding: '15px 10px ', width: '100%', outline: 'none' }} />


      <ul className={classes.list}>
        {sortedQuotes.filter((quote) => {
          if (!quote.text) {
            return (
              <QuoteItem
                key={quote.id}
                id={quote.id}
                author={quote.author}
                text={quote.text}
              />
            )
          }
          if (quote.text.toLowerCase().includes(filterTerm.toLowerCase())) {
            return (
              <QuoteItem
                key={quote.id}
                id={quote.id}
                author={quote.author}
                text={quote.text}
              />
            )
          }
        }

        ).map((quote) => (
          <>

            <QuoteItem
              key={quote.id}
              id={quote.id}
              author={quote.author}
              text={quote.text}
            />

          </>
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;