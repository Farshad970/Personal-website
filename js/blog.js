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
        fetch("https://farshadmofidi.herokuapp.com/posts").then(res => res.json()).then(result => {
            this.setState({
                isLoaded: true,
                posts: result
            });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
            this.setState({
                isLoaded: true,
                error
            });
        });
    }

    render() {
        const { error, isLoaded, posts } = this.state;
        if (error) {
            return React.createElement(
                "div",
                null,
                "Error: ",
                error.message
            );
        } else if (!isLoaded) {
            return React.createElement(
                "div",
                null,
                "Loading..."
            );
        } else {
            return React.createElement(
                "ul",
                null,
                posts.map(item => React.createElement(
                    "li",
                    { key: item.Title },
                    item.Title,
                    " ",
                    item.PostBody
                ))
            );
        }
    }
}

const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(React.createElement(BlogComponent), domContainer);