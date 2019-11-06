class UsersController < Devise::SessionsController
  respond_to :json

  def index
    if user_signed_in?
      respond_with User.where("id = ?", params[:id])[0]
    else
      redirect_to root_path
    end
  end
end
