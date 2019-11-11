class OrderItem < ApplicationRecord
  belongs_to :order
  has_one :product
  validates :product_id, :quantity, :order_id, presence: true
end
