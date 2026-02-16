module ConversationsHelper
  def navbar_conversations
    return Private::Conversation.none unless user_signed_in?

    Private::Conversation
      .involving(current_user)
      .includes(:sender, :recipient)
      .order(updated_at: :desc) # good enough for now
      .limit(10)
  end
end
