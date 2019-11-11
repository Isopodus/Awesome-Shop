Rails.application.routes.draw do
  devise_for :users, :controllers => { :sessions => 'users' }
  root 'pages#index'

  namespace :api, defaults: {format: 'json'} do
    resources :products, only: [:index, :create, :update, :destroy]
    resources :orders, only: [:index, :create, :update, :destroy]
    get "orders/confirm_order/:id" => "orders#confirm_order"
  end

  devise_scope :user do
    get "users/:id" => "users#index", defaults: {format: 'json'}
    get "users/set_active_order/:id" => "users#set_active_order"
  end

  # IMPORTANT #
  # This `match` must be the *last* route in routes.rb
  match '*path', to: 'pages#index', via: :all, constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }
end
