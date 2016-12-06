class NotesList extends React.Component {

    handleChange(e, note) {
        e.preventDefault();
        this.props.onChange(note);
        console.log('handleChange');
    }

    handleRemove(e, note) {
        e.preventDefault();
        this.props.onRemoveNote(note);
    }

  render () {
      var notes = this.props.notes;
      var listItems = notes.map((note) =>
          <a href="#" key={note.id}
             onClick={(e) => this.handleChange(e, note)}
             className={"list-group-item " + (this.props.selectedNote === note ? 'active' : '')}>
              {note.title}

              <span className="pull-right">
                  <button className="btn btn-xs btn-warning" onClick={(e) => this.handleRemove(e, note)}>
                      <span className="glyphicon glyphicon-trash"></span>
                  </button>
              </span>
          </a>
      );
    return (
      <div className="list-group">
          {listItems}
      </div>
    );
  }
}

NotesList.propTypes = {
  notes: React.PropTypes.array,
    selectedNote: React.PropTypes.object
};
