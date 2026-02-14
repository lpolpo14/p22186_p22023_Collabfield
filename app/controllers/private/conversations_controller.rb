class Private::ConversationsController < ApplicationController


  def create
  recipient_id = Post.find(params[:post_id]).user.id

  @conversation = Private::Conversation.create(
    sender_id: current_user.id,
    recipient_id: recipient_id
  )

  if @conversation.persisted?
    Private::Message.create(
      user_id: current_user.id,
      conversation_id: @conversation.id,
      body: params[:message_body]
    )
  end
  end



end
