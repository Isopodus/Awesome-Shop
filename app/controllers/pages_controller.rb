class PagesController < ApplicationController
  def index
    if user_signed_in?
      cookies[:user_id] = current_user.id
    else
      cookies.delete :user_id
    end
  end
end
