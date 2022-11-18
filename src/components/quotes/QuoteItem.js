import { useContext } from 'react';
import classes from './QuoteItem.module.css';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/auth-context';



const QuoteItem = (props) => {

  const AuthCtx = useContext(AuthContext)
  const {isfederatedSignin} = useContext(AuthContext)


  return (
    <li className={classes.item}>
      <figure>
        <blockquote>
          <p>{props.text}</p>
        </blockquote>
        <figcaption>{props.author}</figcaption>
      </figure>
      {AuthCtx.isLoggedIn || isfederatedSignin ?(
      <Link className='btn' to={`/quotes/${props.id}`}>
        View Fullscreen
      </Link>

      ) : ''}
    </li>
  );
};

export default QuoteItem;
