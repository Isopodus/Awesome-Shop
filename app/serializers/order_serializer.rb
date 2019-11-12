class OrderSerializer < ActiveModel::Serializer
  attributes :order_id, :user_id, :status, :products, :created_at

  def products
    orders = Order.where(order_id: object.order_id)
    orders.map { |order_row|
      product = Product.find_by(id: order_row.product_id)
      if product
        {
            quantity: order_row.quantity,
            product: ProductSerializer.new(product)
        }
      else
        nil
      end
    }.compact
  end
end
