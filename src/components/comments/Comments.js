import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { getAllComments } from './../lib/api'
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList'



const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams()

  const { quoteId } = params

  const { sendRequest, status, data: loadedcomments } = useHttp(getAllComments)

  useEffect(() => {

    sendRequest(quoteId)

  }, [quoteId, sendRequest])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const addedCommentHandler = () => {

  }

  let jsxComment ;

  if (status === 'pending') {
    jsxComment = (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    )
  }

  if(status === 'completed' && (loadedcomments && loadedcomments.length  > 0)){
        jsxComment = <CommentsList components={loadedcomments}/>
  } 

  if(status === 'completed' && (!loadedcomments || loadedcomments.length === 0)){
    jsxComment = <p className='centered'>No comments were added yet!</p>
}



  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={params} onAddedComent={addedCommentHandler} />}
       {jsxComment}
    </section>
  );
};

export default Comments;
