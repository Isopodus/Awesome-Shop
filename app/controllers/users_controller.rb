class UsersController < Devise::SessionsController
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
end
