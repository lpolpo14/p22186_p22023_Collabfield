class Group::Message < ApplicationRecord
  serialize :seen_by, coder: JSON, type: Array
  serialize :added_new_users, coder: JSON, type: Array
  self.table_name = "group_messages"

  belongs_to  :conversation,
              class_name: 'Group::Conversation',
              foreign_key: 'conversation_id'
  belongs_to :user

  validates :content, presence: true
  validates :user_id, presence: true
  validates :conversation_id, presence: true

  default_scope { includes(:user) }

  after_create_commit :broadcast_message

  # get a previous message of a conversation
  def previous_message
    previous_message_index = self.conversation.messages.index(self) - 1
    self.conversation.messages[previous_message_index]
  end

  private

  def broadcast_message
   broadcast_append_to conversation,
      target: ActionView::RecordIdentifier.dom_id(conversation, :messages),
      partial: "group/messages/message",
      locals: { message: self }
  end

end
