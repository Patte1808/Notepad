class NotesController < ApplicationController
  def index
    @notes = Note.all
    @auth_token_form = form_authenticity_token
  end

  def new
    @note = Note.new
  end

  def create
    @note = Note.new(note_params)
    @note.save

    redirect_to notes_path
  end

  def update
    @note = Note.find(params[:id])

    if @note.update_attributes(params[:note].permit(:title, :body))
      render :json => @note
    end
  end

  private

  def note_params
    params.require(:note).permit(:title, :body)
  end
end
