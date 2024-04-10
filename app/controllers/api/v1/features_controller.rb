# frozen_string_literal: true

module Api
  module V1
    class FeaturesController < ApplicationController
      def index
        per_page = params[:per_page] || 10
        page = params[:page] || 1
        features = Feature.paginate(page:, per_page:)

        render json: {
          data: features.map do |feature|
            {
              id: feature.id,
              type: 'feature',
              attributes: {
                external_id: feature.external_id,
                magnitude: feature.magnitude,
                place: feature.place,
                time: feature.time,
                tsunami: feature.tsunami,
                mag_type: feature.mag_type,
                title: feature.title,
                coordinates: {
                  longitude: feature.longitude,
                  latitude: feature.latitude
                }
              },
              links: {
                external_url: feature.url
              }
            }
          end,
          pagination: {
            current_page: features.current_page,
            total: features.total_entries,
            per_page: features.per_page
          }
        }
      end
    end
  end
end
