module API
  class OrdersController < ApplicationController
    respond_to :json

    def create
      begin
        # Determine if we have *order_id* param
        if order_params[:order_id]
          order_id = order_params[:order_id]

          # Destroy old order rows
          Order.where(order_id: order_id).each do |order_row|
            order_row.destroy
          end
        else # Set *order_id* to next id or 1 (if no rows exists)
          order_id = Order.maximum(:order_id)&.next
          unless order_id
            order_id = 1
          end
        end

        # Parse params as order rows and create them
        order_params[:products].map { |product|
          order = Order.create!(
              {
                  order_id: order_id,
                  user_id: order_params[:user_id],
                  status: order_params[:status],
                  quantity: product[:quantity],
                  product_id: product[:product][:id]
              })
          order.valid? ? order : nil
        }.compact
        respond_with Order, json: Order.find_by(order_id: order_id)
      rescue StandardError => e
        raise StandardError, e.message
      end
    end

    def show
      respond_with Order.find_by(order_id: params[:id])
    end

    def destroy
      begin
        Order.where(order_id: params[:id]).each do |order_row|
          order_row.destroy!
        end
        respond_with true
      rescue StandardError => e
        raise StandardError, e.message
      end
    end

    def confirm_order
      begin
        Order.where(order_id: params[:id]).each do |order_row|
          order_row.status = 1
          order_row.save!
        end
        respond_with Order, json: Order.find_by(order_id: params[:id])
      rescue StandardError => e
        raise StandardError, e.message
      end
    end

    private

    def order_params
      params.require(:order).permit(
          :order_id,
          :user_id,
          :status,
          :created_at,
          products: [
              :quantity,
              product: [:id, :name, :description, :price, :image_url]
          ]
      )
    end
  end
end