class NotesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectedNoteChange = this.handleSelectedNoteChange.bind(this);
        this.handleToggleViewMode = this.handleToggleViewMode.bind(this);

        this.state = {selectedNote: null, isEditMode: false};
    }

    handleSelectedNoteChange(note) {
        this.setState({selectedNote: note});
    }

    handleToggleViewMode() {
        this.setState({isEditMode: !this.state.isEditMode});
    }

    handleNoteSubmit(note) {
        var notes = this.state.notes;
        var newNotes = notes.concat([note]);
        this.setState({notes: newNotes});


    }

  render () {
    return (
      <div>
          <NotesList notes={this.props.notes} selectedNote={this.state.selectedNote} onChange={this.handleSelectedNoteChange} />
          {this.state.selectedNote !== null &&
            <Note note={this.state.selectedNote}
                  isEditMode={this.state.isEditMode}
                  onToggleViewMode={this.handleToggleViewMode}
                  csrf={this.props.csrf}
            />
          }
      </div>
    );
  }
}

NotesContainer.propTypes = {
  notes: React.PropTypes.array,
    csrf: React.PropTypes.string
};
