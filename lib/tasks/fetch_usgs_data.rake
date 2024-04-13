# frozen_string_literal: true

namespace :usgs_data do
  desc 'Fetch USGS data from earthquakes and persist it to the database'
  task fetch: :environment do
    require 'httparty'
    url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson'
    response = HTTParty.get(url)
    if response.success?
      data = JSON.parse(response.body)
      features = data['features']
      features.each do |feature|
        save_feature(feature['id'], feature['properties'], feature['geometry']['coordinates'])
      end
      puts 'Datos guardados correctamente'
    else
      puts 'Error al obtener los datos de USGS'
    end
  end
end

def save_feature(id, properties, coordinates)
  return unless valid_feature?(properties, coordinates)

  Feature.find_or_create_by(external_id: id) do |feature|
    feature.magnitude = properties['mag']
    feature.place = properties['place']
    feature.time = Time.at(properties['time'] / 1000)
    feature.url = properties['url']
    feature.tsunami = properties['tsunami']
    feature.mag_type = properties['magType']
    feature.title = properties['title']
    feature.longitude = coordinates[0]
    feature.latitude = coordinates[1]
  end
end

def valid_feature?(properties, coordinates)
  properties['title'].present? &&
    properties['url'].present? &&
    properties['place'].present? &&
    properties['magType'].present? &&
    coordinates.present? &&
    properties['mag'].between?(-1.0, 10.0) &&
    coordinates[0].between?(-180.0, 180.0) &&
    coordinates[1].between?(-90.0, 90.0)
end
