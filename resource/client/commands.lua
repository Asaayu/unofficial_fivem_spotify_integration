-- Main command
RegisterCommand('spotify', function()
    if IsPauseMenuActive() then return end
    toggleNuiFrame(true)
end)
TriggerEvent('chat:addSuggestion', '/spotify', 'Open the FiveM Integration to connect and control Spotify.', {})
RegisterKeyMapping('spotify', 'Open', 'keyboard', 'GRAVE')

-- Player commands
RegisterCommand('spotify-resume', function()
    SendReactMessage('command', 'resume')
end)
TriggerEvent('chat:addSuggestion', '/spotify-resume', 'Spotify: Resume the currently playing media.', {})
RegisterKeyMapping('spotify-resume', 'Resume', 'keyboard', '')

RegisterCommand('spotify-pause', function()
    SendReactMessage('command', 'pause')
end)
TriggerEvent('chat:addSuggestion', '/spotify-pause', 'Spotify: Pause the currently playing media.', {})
RegisterKeyMapping('spotify-pause', 'Pause', 'keyboard', '')

RegisterCommand('spotify-next', function()
    SendReactMessage('command', 'next')
end)
TriggerEvent('chat:addSuggestion', '/spotify-next', 'Spotify: Skip to the next track.', {})
RegisterKeyMapping('spotify-next', 'Skip ->', 'keyboard', '')

RegisterCommand('spotify-previous', function()
    SendReactMessage('command', 'previous')
end)
TriggerEvent('chat:addSuggestion', '/spotify-previous', 'Spotify: Skip to the previous track.', {})
RegisterKeyMapping('spotify-previous', 'Skip &lt;- ', 'keyboard', '')

