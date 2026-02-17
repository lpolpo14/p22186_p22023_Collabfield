class Private::ConversationsController < ApplicationController


  def create
    recipient_id = Post.find(params[:post_id]).user.id

    @conversation = Private::Conversation.find_or_create_by(
      sender_id: current_user.id,
      recipient_id: recipient_id
    )
    if @conversation.persisted?
      @message = @conversation.messages.create!(
      user: current_user,
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

  def close
    @conversation_id = params[:id].to_i
    session[:private_conversations].delete(@conversation_id)

    respond_to do |format|
      format.turbo_stream
    end
  end

  def open
    @conversation = Private::Conversation.find(params[:id])
    add_to_conversations unless already_added?

    respond_to do |format|
      format.turbo_stream
      format.html { redirect_back fallback_location: root_path }
    end
  end

    def messages
    @conversation = Private::Conversation.find(params[:id])

    unless [@conversation.sender_id, @conversation.recipient_id].include?(current_user.id)
      head :forbidden and return
    end

    render partial: "private/conversations/conversation/messages_list",
           locals: { conversation: @conversation }
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
