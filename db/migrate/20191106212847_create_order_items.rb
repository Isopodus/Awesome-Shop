class CreateOrderItems < ActiveRecord::Migration[6.0]
  def change
    create_table :order_items do |t|
      t.integer :product_id
      t.integer :quantity
      t.belongs_to :order, null: false, foreign_key: true

      t.timestamps
    end
  end
end
