class OrderConversationsService
  def initialize(params)
    @user = params[:user]
  end

  def call
    all_private_conversations =
      Private::Conversation.all_by_user(@user.id).includes(:messages)

    all_group_conversations =
      @user.group_conversations.includes(:messages)

    all_conversations = all_private_conversations + all_group_conversations

    all_conversations.sort_by { |c| c.messages.last&.created_at || Time.at(0) }.reverse
  end
end

