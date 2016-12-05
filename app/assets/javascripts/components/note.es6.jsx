class Note extends React.Component {
  render () {
    return (
      <div>
        <h2>{this.props.note.title}</h2>
          <article>
              {this.props.note.body}
          </article>
      </div>
    );
  }
}

Note.propTypes = {
  note: React.PropTypes.object
};
