class CommentsController < ApplicationController
  require 'google/apis/youtube_v3'
  

  def index
    
  end
  
  def youtube
    youtube = YoutubeApi.new()
    
    video_id = 'l7wEC-NC7Wo'
    @comments = youtube.get_comments(video_id)
    
  end
  
  def twitter
    twitter = TwitterApi.new()
    #ツイート検索のオプションを記入
    begin
      @tweets, @latest_tweet_id = twitter.search("ウマ娘", 5, params[:latest_tweet_id])
    rescue => exception
      flash[:notice] = exception
      @tweets = []
    end
    
    respond_to do |format|
      format.html
      format.js { render 'comments/Ajax/twitter.js.erb' }
    end
  end
  
  
  def twitch
    @title = params[:title]
    respond_to do |format|
      format.html
      format.js { render 'comments/Ajax/twitch.js.erb'}
    end
  #  @twitch = TwitchApi.new()
  end
  
end
