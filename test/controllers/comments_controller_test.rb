require 'test_helper'

class CommentsControllerTest < ActionDispatch::IntegrationTest
  test "should get root" do
    get root_url
    assert_response :success
  end
  
  test "should get youtube" do
    get youtube_path
    assert_response :success
  end
  
  test "should get twitter" do
    get twitter_path
    assert_response :success
  end

end
