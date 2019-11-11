class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :role, :checked_order_id
  has_many :orders
end
