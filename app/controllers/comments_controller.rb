class CommentsController < ApplicationController
  before_action :twitter_client
  
  def index
    
    #ツイート検索のオプションを記入
    begin
      @tweets = @client.search("ウマ娘", result_type: "recent", exclude: "retweets").take(5).map do |tweet|
      {
        tweet_link: "https://twitter.com/#{tweet.user.screen_name}/status/#{tweet.id}"
      }
      end
    rescue => exception
      @tweets = []
    end
    
  end
  
  def twitter_client
    @client = Twitter::REST::Client.new do |config|
      config.consumer_key        = ENV["TWITTER_CONSUMER_KEY"]
      config.consumer_secret     = ENV["TWITTER_ACCESS_TOKEN_SECRET"]
      config.bearer_token        = ENV["TWITTER_BEARER_TOKEN"]
      #config.access_token        = ENV["TWITTER_ACCESS_TOKEN"]
      #config.access_token_secret = ENV["TWITTER_ACCESS_TOKEN_SECRET"]
    end
  end
end
