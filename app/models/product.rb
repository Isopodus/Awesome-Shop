class Product < ApplicationRecord
  has_one_attached :image
  validates_with ProductValidator

  def image_url
    self.image.attached? ? Rails.application.routes.url_helpers.rails_blob_path(self.image, only_path: true) : nil
  end
end
