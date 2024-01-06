Config = Config or {}

-- Name of the radio station to use
Config.RadioName = 'Unofficial FiveM Spotify Integration'

-- Subtitles on start
Config.SubtitleTop = 'Type "/spotify" in chat to get started!'
Config.SubtitleBottom = 'Made by Asaayu'

-- Function to display a notification to the user
Config.Notification = function(message)
    BeginTextCommandThefeedPost("STRING")
    AddTextComponentSubstringPlayerName(message)
    EndTextCommandThefeedPostTicker(true, true)
end