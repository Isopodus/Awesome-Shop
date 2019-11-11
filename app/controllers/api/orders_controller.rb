module API
  class OrdersController < ApplicationController
    respond_to :json

    def create
      existing_order = Order.find_by(id: order_params[:id])
      if !existing_order
        order = Order.create!(
            {
                user_id: order_params[:user_id]
            })
        if order_params[:order_items]
          order_params[:order_items].each { |item|
            OrderItem.create!(
                {
                    order_id: order.id,
                    quantity: item[:quantity],
                    product_id: item[:product][:id]
                })
          }
        end
        respond_with Order, json: order
      else
        respond_with Order, json: update_order(existing_order.id)
      end
    end

    def update
      respond_with Order, json: update_order(params[:id])
    end

    def destroy
      respond_with Order.find_by(id: params[:id])&.destroy
    end

    def confirm_order
      order = Order.find_by(id: params[:id])
      order.status = 1
      order.save
      respond_with Order, json: order
    end

    private

    def update_order(id)
      order = Order.find_by(id: id)
      if order and order.status == 0
        order.order_items.each do |item|
          item.destroy
        end
        order_params[:order_items].each do |item|
          OrderItem.create!(
              {
                  order_id: order.id,
                  quantity: item[:quantity],
                  product_id: item[:product][:id]
              })
        end
      end
      order
    end

    def order_params
      params.require(:order).permit(
          :id,
          :user_id,
          order_items: [:order_id,
                        :quantity,
                        product: [:id, :name, :description, :price, :image_url]]
      )
    end
  end
end