class OrderSerializer < ActiveModel::Serializer
  attributes :order_id, :user_id, :status, :products, :created_at

  def products
    orders = Order.where(order_id: object.order_id)
    orders&.map { |order_row|
      if order_row.valid?
        product = Product.find_by_id(order_row.product_id)
        if product&.valid?
          {
              quantity: order_row.quantity,
              product: ProductSerializer.new(product)
          }
        end
      end
    }.compact
  end
end
