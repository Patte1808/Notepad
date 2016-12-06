class NotesList extends React.Component {

    handleChange(e, note) {
        e.preventDefault();
        this.props.onChange(note);
        console.log('handleChange');
    }

  render () {
      var notes = this.props.notes;
      var listItems = notes.map((note) =>
          <a href="#" key={note.id} onClick={(e) => this.handleChange(e, note)} className={"list-group-item " + (this.props.selectedNote === note ? 'active' : '')}>{note.title}</a>
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
