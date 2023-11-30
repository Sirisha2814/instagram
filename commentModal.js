import React, { useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
const CommentModal = ({onClose,user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = async () => {
    // console.log(user, newComment);
    try {
      const response = await axios.post(
        'http://localhost:5000/api/comments',
        {
          user,
          text: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        // If the comment is added successfully, fetch comments again to update the list
        toast.success('Comment added successfully')
        setNewComment('');
        onClose(); // Close the modal
      } else {
        toast.error('Failed to add comment. Please try again.');
      }
    } catch (error) {
    //   toast.error('Error adding comment. Please try again.');
      // Handle error (e.g., show a toast)
    }
  };

  const handleViewComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/getcomments`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const comments = response.data;
        console.log(comments);
      } else {
        toast.error('Failed to fetch comments');
      }
    } catch (error) {
      // toast.error('Error fetching comments');
    }
  };
  

  return (
    <div className="fixed inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        {/* Modal panel */}
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                {/* Icon */}
                <svg
                  className="h-6 w-6 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Comments
                </h3>
                <div className="mt-2">
                  {/* Display existing comments */}
                  <button onClick={() => handleViewComments(user._id)}>
                   {comments.map((comment) => (
                   <p key={comment._id} className="text-gray-600">
                  {comment.text}
                  </p>
                  ))}
                </button>

                  {/* Add new comment */}
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mt-2 border p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
                    placeholder="Add a comment..."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={() => {
                handleAddComment();
                onClose();
              }}
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Add Comment
            </button>
            <button
              onClick={onClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:border-blue-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
