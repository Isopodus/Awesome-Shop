module API
  class OrderItemsController < ApplicationController
    # respond_to :json
    #
    # def destroy
    #   respond_with OrderItem.find_by(id: params[:id])&.destroy
    # end
    #
    # def update
    #   respond_with OrderItem.find_by(id: params[:id])&.update(order_items_params)
    # end
    #
    # private
    #
    # def order_items_params
    #   params.require(:order_item).permit(
    #       :order_id,
    #       :quantity,
    #       product: [:id, :name, :description, :price, :image_url])
    # end
  end
end