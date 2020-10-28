class BlogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            posts: []
        };
    }

    componentDidMount() {
        fetch("https://farshadmofidi.herokuapp.com/posts")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        posts: result
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, posts } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                {posts.map(item => (
                    <div class="col-lg-6 col-md-6 col-sm-6 blog-two-two mt-3">
                        <div class="blog-date-time mb-2">
                            <ul>
                            <li>
                                <a href="#contact">July 2020/7</a>
                            </li>
                            </ul>
                        </div>
                        <h4 class="mb-3">
                            <a href="#contact">{item.Title}</a>
                        </h4>
                        {item.PostBody}
                    </div>
                ))}
                </div>
            );
        }
    }
}

const domContainer = document.querySelector('#all-posts');
ReactDOM.render(React.createElement(BlogComponent), domContainer);