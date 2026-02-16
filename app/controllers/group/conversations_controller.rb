class Group::ConversationsController < ApplicationController
  before_action :redirect_if_not_signed_in

  def create
    @conversation = create_group_conversation
    @already_added = already_added?
    add_to_conversations unless @already_added

    respond_to do |format|
      format.turbo_stream
      format.html { redirect_back fallback_location: root_path }
    end
  end

  def open
    @conversation = Group::Conversation.find(params[:id])
    @already_added = already_added?
    add_to_conversations unless @already_added

    respond_to do |format|
      format.turbo_stream
      format.html { redirect_back fallback_location: root_path }
    end
  end

  def close
    @conversation_id = params[:id].to_i
    (session[:group_conversations] ||= []).delete(@conversation_id)

    respond_to do |format|
      format.turbo_stream
    end
  end

  private

  def add_to_conversations
    session[:group_conversations] ||= []
    session[:group_conversations] << @conversation.id
  end

  def already_added?
    (session[:group_conversations] || []).include?(@conversation.id)
  end

  def create_group_conversation
    Group::NewConversationService.new(
      creator_id: params[:creator_id],
      private_conversation_id: params[:private_conversation_id],
      new_user_id: params.dig(:group_conversation, :id) # matches your current form
    ).call
  end
end

