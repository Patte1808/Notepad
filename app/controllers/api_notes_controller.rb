class ApiNotesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    @json = JSON.parse(request.body.read)
    @note = Note.new
    @note.assign_attributes(@json['note'])

    if @note.save
      @notes = Note.all
      render json: @notes
    else
      render nothing: true, status: :bad_request
    end
  end

  def index
    @notes = Note.all

    render json: @notes
  end

  def update
    @json = JSON.parse(request.body.read)
    @note = Note.find(params[:id])

    @note.assign_attributes(@json['note'])
    if @note.save
      render json: @note
    else
      render nothing: true, status: :bad_request
    end
  end

  def destroy
    @note = Note.find(params[:id])

    @note.destroy

    render json: {}, :status => 200
  end
end
