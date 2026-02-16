class Group::Conversation < ApplicationRecord
  self.table_name = 'group_conversations'

  has_and_belongs_to_many :users
  has_many :messages, 
           class_name: "Group::Message",
           foreign_key: 'conversation_id', 
           dependent: :destroy


  def addable_users_for(user)
  return [] unless user

  contact_ids = Array(user.all_active_contacts).map(&:id)
  return [] if contact_ids.empty?

  User.where(id: contact_ids).where.not(id: users.select(:id))
  end


end
