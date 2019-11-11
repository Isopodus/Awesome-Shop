class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  before_action :configure_permitted_parameters, if: :devise_controller?
  # def current_order
  #   if !user_signed_in? and cookies[:order_id] # Check cookie for order id
  #     @order = Order.find(cookies[:order_id])
  #   end
  #
  #   if user_signed_in? # Check if user is logged in
  #     user_order = Order.find_by(user_id: current_user.id) # Find last order
  #     if user_order and user_order.state == 0 # If user has *unfinished* order attached
  #       @order = user_order
  #     elsif cookies[:order_id] # Bind existing cookie order to user
  #       @order = Order.find(cookies[:order_id])
  #       @order.user = current_user
  #       current_user.orders << @order
  #     else # Create order and add it to user
  #       @order = Order.create!
  #       @order.user = current_user
  #       current_user.orders << @order
  #     end
  #   elsif !cookies[:order_id] # Create order and add it to cookies
  #     @order = Order.create!
  #     cookies[:order_id] = {value: @order.id, expires: Time.now + 60 * 60 * 24 * 7}
  #   end
  #   @order
  # end

  protected

  def configure_permitted_parameters
    added_attrs = [:username, :email, :password, :password_confirmation, :remember_me]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end
end
