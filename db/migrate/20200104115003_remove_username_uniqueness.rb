class RemoveUsernameUniqueness < ActiveRecord::Migration[6.0]
  def change
    remove_index :users, :username
    #add_index :users, :username, unique: false
  end
end
