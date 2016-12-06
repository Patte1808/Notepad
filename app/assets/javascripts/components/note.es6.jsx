class Note extends React.Component {

    constructor(props) {
        super(props);
        this.state = {title: this.props.note.title, body: this.props.note.body};

        this.handleViewModeChange = this.handleViewModeChange.bind(this);
        this.handleFormSubmit = this.handleFormSubmit.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleNoteUpdate = this.handleNoteUpdate.bind(this);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            title: newProps.note.title,
            body: newProps.note.body
        });
    }

    handleViewModeChange(e) {
        e.preventDefault();
        this.props.onToggleViewMode();
    }

    handleNoteUpdate(note) {
        this.props.onHandleNoteUpdate(note);
    }

    handleFormSubmit(e) {
        e.preventDefault();
        console.log(fetch);
        var that = this;

        fetch('http://localhost:3000/notes/' + that.props.note.id, {
            method: 'PUT',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'X-CSRF-Token' : that.props.csrf
            },
            body:
                JSON.stringify({
                    note: {title: that.state.title, body: that.state.body}
                }),
            credentials: 'same-origin'
        }).then((response) => {
           if(response.ok) {
               response.json().then((data) => {
                  that.handleNoteUpdate(data);
               });
           }
        });

        this.handleViewModeChange(e);
    }

    handleTitleChange(e) {
        this.setState({title: e.target.value});
    }

    handleBodyChange(e) {
        this.setState({body: e.target.value});
    }

  render () {
        var view;
        if(this.props.isEditMode) {
            view = (
                <div>
                    <form onSubmit={this.handleFormSubmit}>
                        <input type="hidden" name="authenticity_token" value={this.props.csrf} />
                        <input type="text" value={this.state.title} placeholder="Title" onChange={this.handleTitleChange} />
                        <input type="text" value={this.state.body} placeholder="Body" onChange={this.handleBodyChange} />
                        <input type="submit" value="Save Note" />
                    </form>
                </div>
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
