module API
  class OrdersController < ApplicationController
    respond_to :json

    def index
      respond_with Order.all
    end

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
      Order.find(params[:id])&.destroy
    end

    def confirm_order
      order = Order.find(params[:id])
      order.status = 1
      order.save
      respond_with Order, json: order
    end

    private

    def update_order(id)
      order = Order.find_by(id: id)
      if order and order.status == 0
        order_params[:order_items].each { |item|
          new_item = {
              order_id: order.id,
              quantity: item[:quantity],
              product_id: item[:product][:id]
          }
          existing_item = false
          order.order_items.each do |current_item|
            if current_item.product_id == item[:product][:id]
              existing_item = true
              current_item.update(new_item)
              break
            end
          end

          unless existing_item
            OrderItem.create!(new_item)
          end
        }
      end
      order
    end

    def order_params
      params.require(:order).permit(
          :id,
          :user_id,
          order_items: [:order_id,
                        :quantity,
                        product: [:id, :name, :description, :price]]
      )
    end
  end
end