class Note extends React.Component {

    constructor(props) {
        super(props);
        this.state = {title: this.props.note.title, body: this.props.note.body};

        this.handleViewModeChange = this.handleViewModeChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
    }

    handleViewModeChange(e) {
        e.preventDefault();
        this.props.onToggleViewMode();
    }

    handleFormSubmit(e) {
        console.log('Submitted');
        this.handleViewModeChange();
        return false;
    }

    handleTitleChange(e) {
        console.log('Test');
        this.setState({title: e.target.value});
    }

    handleBodyChange(e) {
        this.setState({body: e.target.value});
    }

  render () {
        var view;
        if(this.props.isEditMode) {
            view = (
                <form role="form" acceptCharset="UTF-8" action="/new" method="post">
                    <input type="hidden" name="authenticity_token" value={this.props.csrf} />
                    <input type="text" value={this.state.title} placeholder="Title" onChange={this.handleTitleChange} />
                    <input type="text" value={this.state.body} placeholder="Body" onChange={this.handleBodyChange} />
                    <input type="submit" value="Save Note" onClick={this.handleFormSubmit} />
                </form>
            );
        } else {
            view = (
                <div>
                    <h2>{this.props.note.title}</h2>
                    <article>
                        {this.props.note.body}
                    </article>
                </div>
            );
        }
    return (
      <div>
          <a href="#" onClick={(e) => this.handleViewModeChange(e)}>{this.props.isEditMode ? 'Read' : 'Edit'}</a>
          {view}
      </div>
    );
  }
}

Note.propTypes = {
  note: React.PropTypes.object
};
