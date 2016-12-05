class NotesController < ApplicationController
  def index
    @notes = Note.all
  end

  def new
    @note = Note.new
  end

  def create
    @note = Note.new(note_params)
    @note.save

    redirect_to notes_path
  end

  private

  def note_params
    params.require(:note).permit(:title, :body)
  end
end
