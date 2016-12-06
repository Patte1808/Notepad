class NotesList extends React.Component {

    handleChange(note) {
        this.props.onChange(note);
        console.log('handleChange');
    }

  render () {
      var notes = this.props.notes;
      var listItems = notes.map((note) =>
          <li key={note.id} onClick={() => this.handleChange(note)} className={this.props.selectedNote === note ? 'selected' : ''}>{note.title}</li>
      );
    return (
      <div>
          <ul>
              {listItems}
          </ul>
      </div>
    );
  }
}

NotesList.propTypes = {
  notes: React.PropTypes.array,
    selectedNote: React.PropTypes.object
};
