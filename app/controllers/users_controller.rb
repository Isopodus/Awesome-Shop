class UsersController < Devise::SessionsController
  before_action :check_active_order
  respond_to :json

  def index
    if user_signed_in?
      respond_with User.find_by(id: params[:id])
    else
      redirect_to root_path
    end
  end

  def destroy
    super
    cookies.delete :order_id
  end

  def set_active_order
    if user_signed_in?
      current_user.checked_order_id = params[:id]
      render json: current_user.save
    end
  end

  def check_active_order
    if user_signed_in?
      found = false
      Order.where(user_id: current_user.id).each do |order_row|
        if current_user.checked_order_id == order_row.order_id and order_row.status == 0
          found = true
          break
        end
      end
      unless found
        current_user.checked_order_id = nil
        current_user.save
      end
    end
  end
end
