class AddCheckedOrder < ActiveRecord::Migration[6.0]
  def change
    add_reference(:users, :checked_order, foreign_key: {to_table: :orders})
  end
end
