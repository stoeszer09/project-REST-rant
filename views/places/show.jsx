const React = require('react')
const Def = require('../default')

function show (data) {
    let comments = (
        <h3 className="inactive">
        No comments yet!
        </h3>
    )
    let rating = (
        <h3 className='inactive'>
            Not yet rated.
        </h3>
    )
    if (data.place.comments.length) {

        // Calculate average rating and put in <h3>
        let sumRatings = data.place.comments.reduce((total, comment) => {
            return total + comment.stars
        }, 0)
        let averageRating = Math.round(sumRatings / data.place.comments.length)
        let stars = ''
        for (let i = 0; i < averageRating; i++) {
            stars += '⭐️'
        }
        rating = (
            <h3>
                {stars} stars
            </h3>
        )

        // Piecing comments together in their own <div>
        comments = data.place.comments.map(comment => {
            return (
                <div className="border">
                    <h2 className="rant">{comment.rant ? 'Rant! 😡' : 'Rave! 😻'}</h2>
                    <h4>{comment.content}</h4>
                    <h3>
                        <strong>- {comment.author}</strong>
                    </h3>
                    <h4>Rating: {comment.stars}</h4>
                    <form method="POST" action={`/places/${data.place.id}/comment/${comment.id}?_method=DELETE`}>
                        <input type='submit' className='btn btn-danger' value='Delete Comment' />
                    </form>
                </div>
            )
        })
    }
    return (
        <Def>
          <main>
            <div className="row">
                <div className="col-sm-6">
                    <img src={data.place.pic} alt={data.place.name}/>
                    <h3 className="text-center">
                            Located in {data.place.city}, {data.place.state}
                    </h3>
                </div>
                <div className="col-sm-6">
                    <h1>
                        { data.place.name }
                    </h1>
                    <div>
                        <h2>
                            Rating
                        </h2>
                        {rating}
                        <br />
                    </div>

                    <h2>
                        Description
                    </h2>
                    <h3>
                        {data.place.showEstablished()}
                    </h3>
                    <h4 className="text-center">
                        Serving {data.place.cuisines}
                    </h4>

                    <div>
                       <a href={`/places/${data.place.id}/edit`} className="btn btn-warning">
                        Edit
                        </a>
                        <form method="POST" action={`/places/${data.place.id}?_method=DELETE`}>
                            <button type="submit" className="btn btn-danger">
                                Delete
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                <h2>
                    Comments
                </h2>
                {comments}
            </div>

            <div>
                <h2>Got Your Own Rant or Rave?</h2>
                <form method="POST" action={`/places/${data.place.id}/rant`}>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <input 
                                className="form-control"
                                id="content"
                                name="content"
                                type="text"
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-group col">
                            <label htmlFor="author">Author</label>
                            <input 
                                className="form-control"
                                id="author"
                                name="author"
                                type="text"
                            />
                        </div>

                        <div className="form-group col">
                            <label htmlFor="stars">Star Rating</label>
                            <input 
                                className="form-range"
                                id="stars"
                                name="stars"
                                type="range"
                                min="1"
                                max="5"
                                step="0.5"
                            />
                        </div>

                        <div className="form-group col"> 
                            <label htmlFor="rant">Rant?</label>
                            <br />
                            <input 
                                id="rant"
                                name="rant"
                                type="checkbox"
                                checked
                            />
                        </div>
                    </div>

                    <input 
                        className="btn btn-primary"
                        type="submit"
                        value="Add Comment"
                    />
                </form>
            </div>
          </main>
        </Def>
    )
}

module.exports = show