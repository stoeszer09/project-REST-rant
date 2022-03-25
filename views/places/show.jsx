const React = require('react')
const Def = require('../default')

function show (data) {
    let comments = (
        <h3 className="inactive">
        No comments yet!
        </h3>
    )
    if (data.place.comments.length) {
        comments = data.place.comments.map(comment => {
            return (
                <div className="border">
                    <h2 className="rant">{comment.rant ? 'Rant! 😡' : 'Rave! 😻'}</h2>
                    <h4>{comment.content}</h4>
                    <h3>
                        <strong>- {comment.author}</strong>
                    </h3>
                    <h4>Rating: {comment.stars}</h4>
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
                        <p>
                            Not Rated
                        </p>
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
                       <a href={`/places/${data.id}/edit`} className="btn btn-warning">
                        Edit
                        </a>
                        <form method="POST" action={`/places/${data.id}?_method=DELETE`}>
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
            
          </main>
        </Def>
    )
}

module.exports = show