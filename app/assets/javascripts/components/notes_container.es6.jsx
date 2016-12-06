class NotesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectedNoteChange = this.handleSelectedNoteChange.bind(this);
        this.handleToggleViewMode = this.handleToggleViewMode.bind(this);
        this.handleNoteSubmit = this.handleNoteSubmit.bind(this);
        this.handleNoteUpdate = this.handleNoteUpdate.bind(this);

        this.state = {selectedNote: null, isEditMode: false, notes: this.props.notes};
    }

    handleSelectedNoteChange(note) {
        this.setState({selectedNote: note});
        console.log('Settings state, new selected note is: ' + this.state.selectedNote.title);
    }

    handleToggleViewMode() {
        this.setState({isEditMode: !this.state.isEditMode});
    }

    handleNoteSubmit(note) {
        var notes = this.state.notes;
        var newNotes = notes.concat([note]);

        this.setState({notes: newNotes});
    }

    handleNoteUpdate(note) {
        var notes = this.state.notes;

        for(var i = 0; i < notes.length; i++) {
            if(notes[i].id === note.id) {
                notes[i] = note;

                this.setState({notes: notes, selectedNote: note});
            }
        }
    }

  render () {
    return (
      <div className="row">
          <div className="col-md-4">
            <NotesList notes={this.state.notes} selectedNote={this.state.selectedNote} onChange={this.handleSelectedNoteChange} />
          </div>
          <div className="col-md-8">
              {this.state.selectedNote !== null &&
                <Note note={this.state.selectedNote}
                      isEditMode={this.state.isEditMode}
                      onToggleViewMode={this.handleToggleViewMode}
                      csrf={this.props.csrf}
                      onHandleNoteUpdate={this.handleNoteUpdate}
                />
              }
          </div>
      </div>
    );
  }
}

NotesContainer.propTypes = {
  notes: React.PropTypes.array,
    csrf: React.PropTypes.string
};
