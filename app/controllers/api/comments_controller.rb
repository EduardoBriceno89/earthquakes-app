# frozen_string_literal: true

module Api
  class CommentsController < ApplicationController
    def index
      feature = Feature.find(params[:feature_id])
      comments = feature.comments

      render json: {
        data: comments.map do |comment|
          {
            id: comment.id,
            type: 'comment',
            attributes: {
              body: comment.body
            }
          }
        end
      }
    end

    def create
      feature = Feature.find(params[:feature_id])
      comment = feature.comments.create(comment_params)

      if comment.save
        render json: {
          id: comment.id,
          type: 'comment',
          attributes: {
            body: comment.body
          }
        }, status: :created
      else
        render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def comment_params
      params.require(:comment).permit(:body)
    end
  end
end
