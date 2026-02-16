class Private::MessagesController < ApplicationController
  def create
    @conversation = Private::Conversation.find(params[:conversation_id])

    @message = @conversation.messages.create!(
      message_params.merge(user: current_user)
    )

    # head :ok Removed this
    respond_to do |format|
    format.turbo_stream
    format.html { redirect_back fallback_location: root_path }
    end
  end

  private

  def message_params
    params.require(:private_message).permit(:body)
  end
end

