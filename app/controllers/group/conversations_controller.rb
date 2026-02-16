class Group::ConversationsController < ApplicationController

  def create
    @conversation = create_group_conversation

    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to group_conversation_path(@conversation) }
    end
  end

  private

  def add_to_conversations
    session[:group_conversations] ||= []
    session[:group_conversations] << @conversation.id
  end

  def already_added?
    session[:group_conversations].include?(@conversation.id)
  end

  def create_group_conversation
    Group::NewConversationService.new({
      creator_id: params[:creator_id],
      private_conversation_id: params[:private_conversation_id],
      new_user_id: params[:group_conversation][:id]
    }).call
  end

end
