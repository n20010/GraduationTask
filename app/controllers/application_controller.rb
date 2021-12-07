class ApplicationController < ActionController::Base
  
  # Authorizing each services API clients
  class TwitterApi
    
    def initialize
      @twitter_client = Twitter::REST::Client.new do |config|
        config.consumer_key        = Settings.twitter_api.consumer_key
        config.consumer_secret     = Settings.twitter_api.consumer_secret
        config.bearer_token        = Settings.twitter_api.bearer_token
      end
    end
    
    def search(keyword, quantity, before_latest_tweet_id)
      
      #====================================================================== 
      #最新のツイートを取得
      tweets =  @twitter_client.search("#{keyword}", result_type: "recent", exclude: "retweets")
                .take(quantity).map.with_index do |tweet, index|
        {
          target: 'Twitter',
          id: tweet.id,
          name: tweet.user.screen_name,
          text: tweet.full_text,
          tweet_link: "https://twitter.com/#{tweet.user.screen_name}/status/#{tweet.id}"
        }
      end
      
      #====================================================================== 
      
      #====================================================================== 
      #表示済のツイートはViewへ送らない
      #Don't send to view already displayed
      new_tweets = []
      
      tweets.each do |tweet|
        if tweet[:id].to_s == before_latest_tweet_id.to_s
          break
        else
          new_tweets.push(tweet)
        end
      end
      
      #====================================================================== 
      
      #====================================================================== 
      #Viewへ渡す最新のツイートIDを判定
      if new_tweets == []
        latest_tweet_id = before_latest_tweet_id.to_s
      else
        latest_tweet_id = new_tweets[0][:id].to_s
      end
      
      #渡す辞書の要素をindexがキーのハッシュへ変換
      #tweets_hash = (0...new_tweets.size).zip(new_tweets).to_h
      #====================================================================== 
      
      
      return new_tweets, latest_tweet_id
    end
    
    def regex(tweets, keyword)
      tweets_regexed = []
      tweets.each do |tweet|
        text_regexed = tweet[:text]
        .gsub(/\n/, " ")
        .gsub(/https.*/, "[メディアあり]")
        
        if keyword.match(/^#.*$/)
          text_regexed = text_regexed.gsub(/#{keyword}/, ' ')
        else
        
          
        end
        
        if !(text_regexed.match(/^@[\s\S]*$/))
          tweets_regexed.push({target: "Twitter", text: text_regexed})
        end
      end
      
      return tweets_regexed
    end
    
  end
  
  
  
 # class YoutubeApi
 #     attr_reader :response
 # 
 #     def initialize
 #         @youtube = Google::Apis::YoutubeV3::YouTubeService.new
 # 
 #         @youtube.key = Settings.youtube_api.main_key
 #     end
 # 
 #     def get_comments video_id, page_token = ''
 #         comment_threads = @youtube.list_comment_threads(
 #             'snippet', # part
 #             max_results: 10, # コメント取得件数（1 ~ 100で指定可）
 #             order: 'time', # 取得コメントの並び順（time / relevance 形式のいずれかを指定可）
 #             text_format: 'plainText', # 出力フォーマット（html / plainText 形式のいずれかを指定可）
 #             video_id: video_id
 #             )
 #         
 #         res_comments = comment_threads.items
 #         p res_comments
 #         comments = res_comments.map do |comment|
 #           { 
 #             name: comment.snippet.top_level_comment.snippet.author_display_name,
 #             comment: comment.snippet.top_level_comment.snippet.text_display
 #           }
 #           
 #         end
 #         
 #         return comments
 #     end
 # end
  
  
  
  #class TwitchApi
  #  def initialize
  #    @twitch_client = Twitch::Client.new(
  #      client_id: Settings.twitch_api.client_id,
  #      client_secret: Settings.twitch_api.client_secret
  #  
  #      ## this is default
  #      #token_type: :application,
  #    
  #      ## this can be required by some Twitch end-points
  #      # scopes: scopes,
  #    
  #      ## if you already have one
  #      # access_token: access_token
  #    )
  #  end
  #  
  #end
  
end
