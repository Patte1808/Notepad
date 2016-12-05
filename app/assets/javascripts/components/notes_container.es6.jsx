class NotesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectedNoteChange = this.handleSelectedNoteChange.bind(this);

        this.state = {selectedNote: null};
    }

    handleSelectedNoteChange(note) {
        this.setState({selectedNote: note});
    }

  render () {
    return (
      <div>
          <NotesList notes={this.props.notes} selectedNote={this.state.selectedNote} onChange={this.handleSelectedNoteChange} />
          {this.state.selectedNote !== null &&
            <Note note={this.state.selectedNote} />
          }
      </div>
    );
  }
}

NotesContainer.propTypes = {
  notes: React.PropTypes.array
};
