class NotesContainer extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectedNoteChange = this.handleSelectedNoteChange.bind(this);
        this.handleToggleViewMode = this.handleToggleViewMode.bind(this);
        this.handleNoteSubmit = this.handleNoteSubmit.bind(this);
        this.handleNoteUpdate = this.handleNoteUpdate.bind(this);
        this.handleNewNote = this.handleNewNote.bind(this);
        this.handleNoteRemove = this.handleNoteRemove.bind(this);

        this.state = {selectedNote: null, isEditMode: false, notes: this.props.notes};
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

    handleNoteUpdate(note) {
        var notes = this.state.notes;

        for(var i = 0; i < notes.length; i++) {
            if(notes[i].id === note.id) {
                notes[i] = note;

                this.setState({notes: notes, selectedNote: note});
            }
        }
    }

    handleNoteRemove(note) {
        fetch('http://localhost:3000/notes/' + note.id, {
            method: 'DELETE',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'X-CSRF-Token' : this.props.csrf
            },
            body:
                JSON.stringify({
                    note: note
                }),
            credentials: 'same-origin'
        }).then((response) => {
            if(response.ok) {
                response.json().then((data) => {
                    this.setState({
                        notes: data
                    });

                    if(this.state.selectedNote.id === note.id) {
                        this.setState({
                            selectedNote: (this.state.notes.length > 0) ? this.state.notes[0] : null
                        });
                    }
                });
            }
        });
    }

    handleNewNote(e) {
        e.preventDefault();
        fetch('http://localhost:3000/notes/', {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'X-CSRF-Token' : this.props.csrf
            },
            body:
                JSON.stringify({
                    note: {title: "New Note", body: ""}
                }),
            credentials: 'same-origin'
        }).then((response) => {
            if(response.ok) {
                response.json().then((data) => {
                    var notes = this.state.notes;
                    notes.push(data);

                    this.setState({
                        notes: notes
                    });
                });
            }
        });
    }

  render () {
    return (
        <div>
            <div className="row">
                <a href="#" onClick={this.handleNewNote}>
                    <span className="glyphicon glyphicon-pencil" aria-hidden="true"></span> New Note
                </a>
            </div>
          <div className="row">
              <div className="col-md-4">
                <NotesList notes={this.state.notes}
                           selectedNote={this.state.selectedNote}
                           onChange={this.handleSelectedNoteChange}
                           onRemoveNote={this.handleNoteRemove} />
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
        </div>
    );
  }
}

NotesContainer.propTypes = {
  notes: React.PropTypes.array,
    csrf: React.PropTypes.string
};
