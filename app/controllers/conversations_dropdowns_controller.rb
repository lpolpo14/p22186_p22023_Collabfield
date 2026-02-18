class ConversationsDropdownsController < ApplicationController
  before_action :authenticate_user!

  def show
    conversations = OrderConversationsService.new(user: current_user).call
    render partial: "layouts/navigation/header/dropdowns/conversations/dropdown",
           locals: { conversations: conversations }
  end
end
