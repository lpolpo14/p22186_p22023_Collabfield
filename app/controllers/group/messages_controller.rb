class Group::MessagesController < ApplicationController
  before_action :redirect_if_not_signed_in

  def create
    @conversation = Group::Conversation.find(group_message_params[:conversation_id])

    @message = @conversation.messages.create!(
      content: group_message_params[:content],
      user: current_user
    )

    respond_to do |format|
      format.turbo_stream
      format.html { redirect_back fallback_location: root_path }
    end
  end

  private

  def group_message_params
    params.require(:group_message).permit(:conversation_id, :content)
  end
end

