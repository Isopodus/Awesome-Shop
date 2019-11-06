class PagesController < ApplicationController
  def index
    cookies[:user_id] = user_signed_in? ? current_user.id : nil
  end
end
