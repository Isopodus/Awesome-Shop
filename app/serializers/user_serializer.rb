class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :role, :checked_order_id, :orders

  def orders
    added_orders = []
    Order.where(user_id: object.id).map { |order_row|
      if !added_orders.include?(order_row.order_id)
        added_orders.push(order_row.order_id)
        OrderSerializer.new(order_row)
      else
        nil
      end
    }.compact
  end
end
