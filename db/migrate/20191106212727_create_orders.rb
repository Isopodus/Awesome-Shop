class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.integer :order_id
      t.belongs_to :user, null: false, foreign_key: true
      t.integer :status, default: 0
      t.integer :product_id
      t.integer :quantity
      t.timestamps
    end
  end
end
