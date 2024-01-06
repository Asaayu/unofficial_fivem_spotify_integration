local playerData = nil
local state = nil
local settings = nil
local isCustomRadioPlaying = nil

-- Default radio name
AddTextEntryByHash(`RADIO_36_AUDIOPLAYER`, Config.RadioName)
AddTextEntryByHash(`RADIO_36_LABEL`, Config.RadioName)
AddTextEntryByHash(`RADIO_36_SHORT`, Config.RadioName)
AddTextEntryByHash(`2095A`, Config.SubtitleTop) -- Artist
AddTextEntryByHash(`2095S`, Config.SubtitleBottom) -- Song Name

-- Main Loop
Citizen.CreateThread(function()
    local spotifyRadioIndex = 0

    while true do
        local sleep = 100
        local player = PlayerPedId()
        local vehicle = GetVehiclePedIsIn(player, false)
        local radioIndex = GetPlayerRadioStationIndex()

        if playerData and state and settings then
            local muted = playerData.volume <= 0
            local paused = state.paused
            if settings.vehicleRadio then
                if
                    DoesEntityExist(vehicle) and
                    DoesPlayerVehHaveRadio(vehicle) and
                    IsPlayerVehRadioEnable(vehicle)
                then
                    if radioIndex == spotifyRadioIndex then
                        if muted or paused or not isCustomRadioPlaying then
                            SendReactMessage('userRadioStart')
                        end
                    else
                        if not muted or not paused or isCustomRadioPlaying then
                            SendReactMessage('userRadioStop')
                        end
                    end
                elseif not DoesEntityExist(vehicle) then
                    if not muted or not paused or isCustomRadioPlaying then
                        SendReactMessage('userRadioStop')
                    end
                end
            end
        end
        Wait(sleep)
    end
end)

-- NUI Callbacks
RegisterNUICallback('hideFrame', function(_, cb)
    toggleNuiFrame(false)
    debugPrint('Hide NUI frame')
    cb({})
end)

RegisterNUICallback('setSpotifyPlayerData', function(data, cb)
    playerData = data
    cb({})
end)

RegisterNUICallback('setSpotifyStateData', function(data, cb)
    state = data
    cb({})
end)

RegisterNUICallback('setSpotifySettingsData', function(data, cb)
    settings = data
    cb({})
end)

RegisterNUICallback('setSpotifyCustomRadioPlayingData', function(data, cb)
    isCustomRadioPlaying = data
    cb({})
end)

RegisterNUICallback('setCurrentSongData', function(data, cb)
    AddTextEntryByHash(`2095A`, string.upper(data.artist))
    AddTextEntryByHash(`2095S`, data.title)
    cb({})
end)

RegisterNUICallback('notification', function(message, cb)
    Config.Notification(message)
    cb({})
end)