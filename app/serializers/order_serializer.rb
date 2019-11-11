class OrderSerializer < ActiveModel::Serializer
  attributes :id, :status, :user_id, :order_items, :created_at

  def order_items
    self.object.order_items.map do |order_item|
      product = Product.find_by(id: order_item.product_id)
      {
          id: order_item.id,
          order_id: order_item.order_id,
          quantity: order_item.quantity,
          product: ProductSerializer.new(product)
      }
    end
  end
end
