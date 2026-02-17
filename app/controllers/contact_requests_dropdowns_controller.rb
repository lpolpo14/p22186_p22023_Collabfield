class ContactRequestsDropdownsController < ApplicationController
  def show
    @requests = current_user.pending_received_contact_requests
    render partial: "layouts/navigation/header/dropdowns/contact_requests/dropdown",
           locals: { requests: @requests }
  end
end
