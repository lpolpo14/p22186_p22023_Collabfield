class Group::AddUserToConversationService
  def initialize(params)
    @group_conversation_id = params[:group_conversation_id]
    @new_user_id = params[:new_user_id]
    @added_by_id = params[:added_by_id]
  end

  def call
    group_conversation = Group::Conversation.find(@group_conversation_id)
    new_user = User.find(@new_user_id)
    added_by = User.find(@added_by_id)

    return if group_conversation.users.exists?(new_user.id)

    group_conversation.users << new_user

    # update name
    group_conversation.update!(
      name: group_conversation.users.order(:name).pluck(:name).join(", ")
    )

    create_info_message(group_conversation, new_user, added_by)
  end

  private

  def create_info_message(group_conversation, new_user, added_by)
    Group::Message.create!(
      conversation: group_conversation,
      user: added_by,
      content: "#{new_user.name} added by #{added_by.name}",
      added_new_users: [new_user.id]
    )
  end
end

