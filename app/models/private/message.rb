class Private::Message < ApplicationRecord
  self.table_name = 'private_messages'
  belongs_to :user
  belongs_to :conversation, 
             class_name: 'Private::Conversation',
             foreign_key: :conversation_id

  after_create_commit :broadcast_message
  validates :body, presence: true

  private

  def broadcast_message
  broadcast_append_to conversation,
    target: "conversation_#{conversation.id}_messages",
    partial: "private/messages/message",
    locals: { message: self }
  end
  
end
