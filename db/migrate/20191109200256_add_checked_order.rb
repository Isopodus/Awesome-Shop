class AddCheckedOrder < ActiveRecord::Migration[6.0]
  def change
    add_column(:users, :checked_order_id, :integer)
  end
end
