class RoomChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    p '[*] WebSocket was connected from someone'
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
  
end
