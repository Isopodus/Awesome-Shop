Rails.application.routes.draw do
  devise_for :users
  root 'pages#index'

  namespace :api, defaults: { format: 'json' } do
    resources :products, only: [:index, :create, :update, :destroy]
    get "products/:id" => "products#find"
  end

  devise_scope :user do
    get "users/:id" => "users#index", defaults: { format: 'json' }
  end

  # IMPORTANT #
  # This `match` must be the *last* route in routes.rb
  match '*path', to: 'pages#index', via: :all, constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
