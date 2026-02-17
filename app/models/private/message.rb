class Private::Message < ApplicationRecord
  self.table_name = 'private_messages'
  belongs_to :user
  belongs_to :conversation, 
             class_name: 'Private::Conversation',
             foreign_key: :conversation_id

  after_create_commit :broadcast_message
  validates :body, presence: true

  private

  # This does not really do anything. Still - It is very good to implement in the future as it is best practice and easy to maintain. 
  # The reason why it was not set up is due to compatibiltiy issues between network adapters, computers etc. (Issues with Redis)
  def broadcast_message
  broadcast_append_to conversation,
    target: "conversation_#{conversation.id}_messages",
    partial: "private/messages/message",
    locals: { message: self }
  end
  
end
