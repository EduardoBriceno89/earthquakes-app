# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
    resources :features do
      resources :comments, only: %i[create index]
    end
  end
end
