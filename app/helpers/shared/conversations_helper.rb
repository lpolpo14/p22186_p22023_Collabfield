module Shared::ConversationsHelper
  def private_conv_seen_status(conversation)
    last_message = conversation.messages.last
    return '' unless last_message

    not_created_by_user = last_message.user_id != current_user.id
    unseen = (last_message.seen == false)

    not_created_by_user && unseen ? 'unseen-conv' : ''
  end

  def group_conv_seen_status(conversation, current_user)
    return '' if current_user.nil?

    last_message = conversation.messages.last
    return '' unless last_message

    not_created_by_user = last_message.user_id != current_user.id
    seen_by_user = last_message.seen_by.include?(current_user.id)

    not_created_by_user && seen_by_user == false ? 'unseen-conv' : ''
  end
end

