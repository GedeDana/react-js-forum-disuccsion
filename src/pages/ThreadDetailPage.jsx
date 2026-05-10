import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  asycGetDetailThread,
  asyncCreateComment,
  asyncDownVoteDetailThread,
  asyncDownVoteThreadDetailComment,
  asyncNeutralizeVoteDetailThread,
  asyncNeutralizeVoteThreadDetailComment,
  asyncUpVoteDetailThread,
  asyncUpVoteThreadDetailComment,
} from '../states/threadDetailAndComment/action';
import ThreadsDetail from '../components/ThreadsDetail';
import CommentListPage from './CommentListPage';
import SideBarContext from '../utils/SideBarContext';

function ThreadDetailPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();
  const sidebar = useContext(SideBarContext);

  useEffect(() => {
    dispatch(asycGetDetailThread({ threadId: id }));
  }, [id, dispatch]);

  const upVote = (threadId) => {
    dispatch(asyncUpVoteDetailThread({ threadId }));
  };

  const downVote = (threadId) => {
    dispatch(asyncDownVoteDetailThread({ threadId }));
  };

  const neutralizeVote = (threadId, statusVoteLast) => {
    dispatch(asyncNeutralizeVoteDetailThread({ threadId, statusVoteLast }));
  };

  const createComment = ({ threadId, content }) => {
    dispatch(asyncCreateComment({ threadId, content }));
  };

  const upCommentVote = ({ commentId }) => {
    dispatch(asyncUpVoteThreadDetailComment({ threadId: id, commentId }));
  };

  const downCommentVote = ({ commentId }) => {
    dispatch(asyncDownVoteThreadDetailComment({ threadId: id, commentId }));
  };

  const neutralizeCommentVote = ({ commentId, statusVoteLast }) => {
    console.log({ commentId, statusVoteLast }, 'coba masuk algi');

    dispatch(
      asyncNeutralizeVoteThreadDetailComment({
        threadId: id,
        commentId,
        statusVoteLast,
      }),
    );
  };
  if (threadDetail == null) {
    return null;
  }
  const dataThredDetail = {
    ...threadDetail,
    authUser: authUser.id,
  };
  return (
    <div className={`flex flex-col justify-items-end ${sidebar ? 'sm:ml-80 mr-10': 'sm:px-15 px-5' }`}>
      <h1 className="font-bold text-center text-2xl mt-10">Detail Thread</h1>
      <ThreadsDetail
        threads={dataThredDetail}
        key={threadDetail.id}
        upVote={upVote}
        downVote={downVote}
        neutralizeVote={neutralizeVote}
        createComment={createComment}
      />
      <CommentListPage
        commentList={dataThredDetail.comments}
        authuser={dataThredDetail.authUser}
        upVoteComment={upCommentVote}
        downVoteComment={downCommentVote}
        neturalizecComment={neutralizeCommentVote}
      />
    </div>
  );
}
export default ThreadDetailPage;
