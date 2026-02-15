class Private::ConversationsController < ApplicationController


  def create
    recipient_id = Post.find(params[:post_id]).user.id

    @conversation = Private::Conversation.find_or_create_by(
      sender_id: current_user.id,
      recipient_id: recipient_id
    )

    if @conversation.persisted?
      Private::Message.create(
        user_id: current_user.id,
        conversation_id: @conversation.id,
        body: params[:message_body]
      )

      @already_added = already_added?
      add_to_conversations unless @already_added
    end

    respond_to do |format|
      format.turbo_stream
      format.html { redirect_to root_path }
    end
    end

  private

  def add_to_conversations
    session[:private_conversations] ||= []
    session[:private_conversations] << @conversation.id
  end

  def already_added?
    session[:private_conversations].include?(@conversation.id)
  end


end
