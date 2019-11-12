class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :validatable, :confirmable

  validates :username, presence: :true, uniqueness: {case_sensitive: false}

  has_many :orders, -> { order(status: :DESC, order_id: :ASC) }

end
