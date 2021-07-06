class CommentsController < ApplicationController
  require 'google/apis/youtube_v3'

  before_action :twitter_client, only: [:twitter]

  class YoutubeApi
      attr_reader :response
  
      def initialize api_key
          @youtube = Google::Apis::YoutubeV3::YouTubeService.new
  
          @youtube.key = api_key # APIキー設定
      end
  
      def comment_threads video_id, page_token = ''
          @response = @youtube.list_comment_threads(
              'snippet', # part
              max_results: 10, # コメント取得件数（1 ~ 100で指定可）
              order: 'time', # 取得コメントの並び順（time / relevance 形式のいずれかを指定可）
              text_format: 'plainText', # 出力フォーマット（html / plainText 形式のいずれかを指定可）
              video_id: video_id)
      end
  end

  def index
  end
  
  def youtube
    api_key = Settings.youtube_api.main_key
    youtube_api = YoutubeApi.new(api_key)

    video_id = 'sfr_QpFCVQU'
    youtube_api.comment_threads(video_id)

    res_comments = youtube_api.response.items # 最初のコメント
    
    @comments = res_comments.map do |comment|
      { 
        name: comment.snippet.top_level_comment.snippet.author_display_name,
        comment: comment.snippet.top_level_comment.snippet.text_display
      }
    end
    
  end
  
  def twitter
    #ツイート検索のオプションを記入
    begin
      @tweets = @client.search("from:@sikra_xs", result_type: "recent", exclude: "retweets").take(5).map do |tweet|
      {
        tweet_link: "https://twitter.com/#{tweet.user.screen_name}/status/#{tweet.id}"
      }
      end
    rescue => exception
      flash[:notice] = exception
      @tweets = []
    end
    
  end
  
  def twitter_client
    @client = Twitter::REST::Client.new do |config|
      config.consumer_key        = Settings.twitter_api.consumer_key
      config.consumer_secret     = Settings.twitter_api.consumer_secret
      config.bearer_token        = Settings.twitter_api.bearer_token
    end
  end
    
end
