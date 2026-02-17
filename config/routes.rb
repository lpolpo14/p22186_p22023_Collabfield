Rails.application.routes.draw do

  devise_for :users, controllers: { 
  registrations: "registrations",
  omniauth_callbacks: 'users/omniauth_callbacks'
  }
  # devise_for :users, :controllers => {:registrations => "registrations"} Old way.
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # get "up" => "rails/health#show", as: :rails_health_check
  root to: 'pages#index'
  devise_scope :user do
  get 'login', to: 'devise/sessions#new'
  end

  devise_scope :user do
  get 'signup', to: 'devise/registrations#new'
  end

  resources :posts do
    collection do
    get 'hobby'
    get 'study'
    get 'team'
  end
  end

  namespace :private do 
    resources :conversations, only: [:create] do
      member do
        post :close
        post :open
      end
    end
    resources :messages, only: [:index, :create]
  end
  resources :contacts, only: [:create, :update, :destroy]

  namespace :group do 
  resources :conversations do
    member do
      post :close
      post :open
    end
  end
  resources :messages, only: [:index, :create]
  end

  # Used for contacts dropdown
  resource :contact_requests_dropdown, only: :show

end


