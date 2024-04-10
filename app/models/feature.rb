# frozen_string_literal: true

class Feature < ApplicationRecord
  validates :external_id, presence: true, uniqueness: true
  validates :magnitude, presence: true
  validates :place, presence: true
  validates :time, presence: true
  validates :url, presence: true, format: { with: URI::DEFAULT_PARSER.make_regexp }
  validates :tsunami, inclusion: { in: [true, false] }
  validates :mag_type, presence: true
  validates :title, presence: true
  validates :longitude, presence: true
  validates :latitude, presence: true
end
