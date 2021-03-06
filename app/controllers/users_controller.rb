class UsersController < Devise::SessionsController
  before_action :check_active_order
  respond_to :json

  def index
    if user_signed_in? and current_user.role == 1
      respond_with User.order(id: :ASC)
    else
      redirect_to root_path
    end
  end

  def show
      respond_with User.find_by_id(params[:id])
  end

  def destroy
    super
    cookies.delete :order_id
  end

  def set_active_order
    if user_signed_in?
      begin
        current_user.checked_order_id = params[:id]
        respond_with json: current_user.save!
      rescue StandardError => e
        raise StandardError, e.message
      end
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
        begin
          current_user.checked_order_id = nil
          current_user.save!
        rescue Standarderror => e
          raise StandardError, e.message
        end
      end
    end
  end

  def toggle_admin
    if user_signed_in? and current_user.role == 1
      user = User.find_by_id(params[:id])
      if user.role == 1
        user.role = 0
      else
        user.role = 1
      end
      begin
        respond_with json: user.save!
      rescue Standarderror => e
        raise StandardError, e.message
      end
    end
  end
end
