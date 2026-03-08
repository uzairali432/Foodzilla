import React, { useState, useContext } from 'react';

const ReviewSection = ({ entityId, entityType, initialReviews = [], initialRating = 0, initialNumReviews = 0 }) => {
  const [reviews, setReviews] = useState(initialReviews);
  const [rating, setRating] = useState(initialRating);
  const [numReviews, setNumReviews] = useState(initialNumReviews);
  const [newRating, setNewRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const submitReview = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to leave a review.');
      return;
    }

    try {
      const response = await fetch(`/api/${entityType}/${entityId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ rating: newRating, comment })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      setSuccess('Review added successfully!');
      setComment('');
      setNewRating(5);
      
      // Optionally decode user token to append the review optimistically
      const newReview = {
        _id: Date.now().toString(),
        name: 'You', // placeholder since we don't have the current user's name easily accessible
        rating: newRating,
        comment,
        createdAt: new Date().toISOString()
      };
      
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);
      setNumReviews(updatedReviews.length);
      const avg = updatedReviews.reduce((acc, item) => item.rating + acc, 0) / updatedReviews.length;
      setRating(avg);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-xl font-semibold mb-2">Reviews ({numReviews})</h3>
      {rating > 0 && <p className="text-gray-600 mb-4">Average Rating: {rating.toFixed(1)} / 5</p>}
      
      <div className="mb-6 space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-sm">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((r, index) => (
            <div key={index} className="bg-gray-50 p-3 rounded-md shadow-sm">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-gray-800">{r.name}</span>
                <span className="text-yellow-500 font-bold">{r.rating} ★</span>
              </div>
              <p className="text-gray-600 text-sm">{r.comment}</p>
            </div>
          ))
        )}
      </div>

      <div className="bg-white p-4 rounded-md shadow-sm border">
        <h4 className="font-medium mb-3">Leave a Review</h4>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
        <form onSubmit={submitReview} className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
            <select
              value={newRating}
              onChange={(e) => setNewRating(Number(e.target.value))}
              className="w-full border p-2 rounded-md outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border p-2 rounded-md outline-none focus:ring-1 focus:ring-primary min-h-[80px]"
              placeholder="What did you think?"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-orange-600 transition"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewSection;
