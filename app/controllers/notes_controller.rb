class NotesController < ApplicationController
  def index
    @notes = Note.all
    @auth_token_form = form_authenticity_token
    respond_to do |format|
      format.html
      format.json { render json: @notes }
    end
  end

  def new
    @note = Note.new
  end

  def create
    @note = Note.new(note_params)
    @note.save

    render :json => @note
  end

  def update
    @note = Note.find(params[:id])

    if @note.update_attributes(params[:note].permit(:title, :body))
      render :json => @note
    end
  end

  def destroy
    @note = Note.find(params[:id])
    @note.destroy

    render :json => Note.all
  end

  private

  def note_params
    params.require(:note).permit(:title, :body)
  end
end
