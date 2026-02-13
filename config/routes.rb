Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: "registrations" } # More modern
  # devise_for :users, :controllers => {:registrations => "registrations"} Old way.
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # get "up" => "rails/health#show", as: :rails_health_check
  root to: 'pages#index'
  devise_scope :user do
  get 'login', to: 'devise/sessions#new'
  end
end


